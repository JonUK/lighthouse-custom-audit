const { Gatherer } = require('lighthouse');
const pageFunctions = require('lighthouse/lighthouse-core/lib/page-functions');

/* global getNodeDetails */

class NonInteractiveClickHandlersGatherer extends Gatherer {
  /**
   * @param {LH.Gatherer.PassContext} options
   * @param {LH.Gatherer.LoadData} loadData
   */
  async afterPass(options, loadData) {
    const driver = options.driver;

    const mainFn = () => {

      /**
       * Returns a boolean indicating if the element has an event listener for type
       * @param {HTMLElement} element
       * @param {string} type Event type e.g. 'click'
       * @returns {boolean}
       */
      function hasEventListener(element, type) {
        const eventListeners = getEventListeners(element);
        return !!eventListeners[type];
      }

      // The tag names of the non-interactive elements which we'll check
      const tagNamesToCheck = ['div', 'span'];
      const selector = tagNamesToCheck.join(', ');
      const elements = Array.from(document.querySelectorAll(selector));

      const failingElements = elements
        .filter(element => hasEventListener(element, 'click'))
        .filter(element => {
          // Assume that any keyboard related handlers are covering web
          // accessibility for keyboard users (this could be a false negative).
          const hasKeyHandler =
            hasEventListener(element, 'keydown') ||
            hasEventListener(element, 'keyup') ||
            hasEventListener(element, 'keypress');

          // Without the "tabindex" attribute, a non-interactive element won't be
          // able to receive focus. It's only recommended to use the value 0 which
          // means the element receives focus in the DOM order.
          const hasValidTabIndex = element.tabIndex === 0;

          const hasRoleAttribute = element.getAttribute('role');

          return !hasKeyHandler || !hasValidTabIndex || !hasRoleAttribute;
        });

      const elementSummaries = failingElements.map(element => ({
        // getNodeDetails is put into scope via the "deps" array
        tagName: element.tagName,
        node: getNodeDetails(element)
      }));

      /**
       * @return {LH.Gatherer.PhaseResult}
       */
      return elementSummaries;
    }

    return driver.executionContext.evaluate(mainFn, {
      args: [],
      deps: [
        pageFunctions.getElementsInDocumentString,
        pageFunctions.getNodeDetailsString,
      ]
    });
  }
}

module.exports = NonInteractiveClickHandlersGatherer;