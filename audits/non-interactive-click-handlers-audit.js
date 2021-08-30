// Lighthouse audit to check for click handlers on non-interactive elements that are not operable via keyboard.
const { Audit } = require('lighthouse');

class NonInteractiveClickHandlersAudit extends Audit {
  static get meta() {
    /**
     * @return {LH.Audit.Meta}
     */
    return {
      id: 'non-interactive-click-handlers-id',
      title: 'Checks that click handlers on non-interactive elements can be operated via keyboard',
      failureTitle: 'One or more non-interactive elements has a click handler but is not keyboard operable',
      description:
        `When click handlers are added to non-interactive elements like div and span, keydown handling
         should be used to ensure the element is operable via the keyboard and the tabindex attribute
         used so the element can receive focus.`,

      // The name of the built-in or custom gatherer class that provides data to this audit
      requiredArtifacts: ['NonInteractiveClickHandlersGatherer'],
    };
  }

  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // See https://www.desmos.com/calculator/tsunbwqt3f
      p10: 0.5,
      median: 1
    };
  }

  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   */
  static audit(artifacts, context) {
    // Get the data / elements collected by the gatherer
    const elementSummaries = artifacts.NonInteractiveClickHandlersGatherer;

    const results = elementSummaries.map(element => ({
      node: Audit.makeNodeItem(element.node),
      tagName: element.tagName
    }));

    /** @type {LH.Audit.Details.Table['headings']} */
    const headings = [
      { key: 'tagName', itemType: 'text', text: 'Tag name' },
      { key: 'node', itemType: 'node', text: 'Failing element' }
    ];

    const score = Audit.computeLogNormalScore(
      {p10: context.options.p10, median: context.options.median},
      results.length
    );

    /**
     * @return {LH.Product}
     */
    return {
      score, // Number between 0 and 1
      numericValue: results.length,
      numericUnit: 'element',
      displayValue: `${results.length} elements`,
      details: Audit.makeTableDetails(headings, results),
    };
  }
}

module.exports = NonInteractiveClickHandlersAudit;