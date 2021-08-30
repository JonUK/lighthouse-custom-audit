window.addEventListener('DOMContentLoaded', () => {

  const elementIdsToAddClickHandler = [
    'normalButton',
    'inaccessibleDiv',
    'accessibleDiv'
  ]

  elementIdsToAddClickHandler.forEach(elementId => {
    const element = document.getElementById(elementId);
    element.addEventListener('click', () => {
      alert('You clicked me!');
    })
  })

  const accessibleDivElement = document.getElementById('accessibleDiv');
  accessibleDivElement.addEventListener('keydown', event => {
    if (event.code === 'Space' || event.code === 'Enter') {
      accessibleDivElement.click();
    }
  });

});