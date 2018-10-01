### Bootstrap Component for Aurelia
This is a fork of Hector Romero's aurelia-bootstrap plugin.
It currently contains some bugfixes in the dropdown plugin to handle
dropdowns inside Shadow DOM. 

There is no separate documentation for this fork (sorry).

Please visit the [project page](http://tochoromero.github.com/aurelia-bootstrap) for the documentation and examples.

### Available Components:
* Accordion
* Buttons
* Collapse
* Dropdown
* Pagination
* Popover
* Tabs
* Tooltip
* Typeahead

### Release Notes
##### Fork by Kris Dages
#### 0.1.21-prerelease
Dropdown: Attach outside click listener to `element.getRootNode()` instead of `document`.

##### Pre-fork
###
#### 0.1.20
Custom HTML templates for typeahead.

#### 0.1.19
Assign id to typeahead's input. This will allow you to use a label <strong>for</strong> attribute with a typeahead.

#### 0.1.18
Fix dropdown close 'always' for Bootstrap 4

#### 0.1.17
* Use 'show' classes according to Bootstrap 4 Alpha 6.
* Add styles for pagination with Bootstrap 4.
* Provide a way to add custom css classes to tooltips.

#### 0.1.16
Check if we have an actual popover object when detaching the Popover before setting the display to none.

#### 0.1.15
Handle Custom Popovers better when the same popover is used in multiple elements.

#### 0.1.14
Typeahead tweaks and the [documentation](https://tochoromero.github.io/aurelia-bootstrap/#/typeahead) for it is now live.

#### 0.1.13
New Typehead component. Allow you to have an input with a list of filterable suggestions.

#### 0.1.12
All the component default values are globally configurable. Please check the [documentation](https://tochoromero.github.io/aurelia-bootstrap/#/defaults) for more details.

