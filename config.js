module.exports = {
  // 1. Run your custom tests along with all the default Lighthouse tests
  extends: 'lighthouse:default',

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page
  passes: [
    {
      passName: 'defaultPass',
      gatherers: [
        './gatherers/non-interactive-click-handlers-gatherer.js'
      ]
    }
  ],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run
  audits: [
    './audits/non-interactive-click-handlers-audit.js'
  ],

  // 4. Create a new 'Custom Audit' section in the default report for our results
  categories: {
    custom: {
      title: 'Custom',
      description: 'Custom audit for our checks on DOM element issues',
      auditRefs: [
        // "weight" controls how multiple audits are averaged together
        { id: 'non-interactive-click-handlers', weight: 1 }
      ]
    }
  }
};