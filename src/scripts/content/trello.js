/*jslint indent: 2 */
/*global $: false, document: false, togglbutton: false, createTag:false*/

'use strict';

function harvestTagsFromDescription() {
  var descriptionText = $('.js-card-desc').innerText;
  var descriptionTextLines = descriptionText.split(/\s*\r?\n\s*/);
  var TAG_PREFIX = 'toggltag: ';
  var tagLineRegex = new RegExp('^' + TAG_PREFIX);
  var tagLines = descriptionTextLines.filter((l) => {
    return tagLineRegex.test(l);
  });
  return tagLines.map((l) => {
    return l.slice(TAG_PREFIX.length).trim();
  });
}

togglbutton.render('.window-header:not(.toggl)', {observe: true}, function (elem) {
  var link, container = createTag('div', 'button-link trello-tb-wrapper'),
    //duration,
    descFunc,
    titleElem = $('.window-title h2', elem),
    //trackedContainer = createTag('div', 'toggl-tracked'),
    //trackedElem = $('.other-actions'),
    projectElem = $('.board-header > a'),
    descriptionElem = $('.js-move-card');

  descFunc = function () {
    return titleElem.innerText;
  };

  link = togglbutton.createTimerLink({
    className: 'trello',
    description: descFunc,
    projectName: projectElem.innerText,
    tags: harvestTagsFromDescription(),
    calculateTotal: true,
  });

  container.appendChild(link);
  descriptionElem.parentNode.insertBefore(container, descriptionElem);

  // Add Tracked time text
  /*
  duration = togglbutton.calculateTrackedTime(titleElem.innerText);
  trackedContainer.innerHTML = "<h3>Time tracked</h3><p title='Time tracked with Toggl: " + duration + "'>" + duration + "</p>";
  trackedElem.parentNode.insertBefore(trackedContainer, trackedElem);
  */
});

/* Checklist buttons */
togglbutton.render('.checklist-item-details:not(.toggl)', {observe: true}, function (elem) {
  var link,
    projectElem = $('.board-header > a'),
    titleElem = $('.window-title h2'),
    taskElem = $('.checklist-item-details-text', elem);

  link = togglbutton.createTimerLink({
    className: 'trello',
    buttonType: 'minimal',
    projectName: projectElem.innerText,
    description: titleElem.innerText + ' - ' + taskElem.innerText,
    tags: harvestTagsFromDescription(),
  });

  link.classList.add('checklist-item-button');
  elem.parentNode.appendChild(link);
});
