import {bindable, bindingMode, inject} from "aurelia-framework";
import {TooltipService} from "../utils/tooltip-service";
import {bootstrapOptions} from "../utils/bootstrap-options";
import velocity from "velocity-animate";

@inject(Element, TooltipService)
export class AubsPopoverCustomAttribute {

    @bindable title;
    @bindable text;
    @bindable position = 'top';
    @bindable disabled = false;
    @bindable({defaultBindingMode: bindingMode.twoWay}) isOpen = false;
    @bindable trigger = 'mouseover';
    @bindable customPopover;
    @bindable onOpen;
    @bindable onClose;

    triggers = [];

    validPositions = ['top', 'bottom', 'left', 'right'];
    valuesChanged = false;
    visible = false;

    constructor(element, tooltipService) {
        this.element = element;
        this.tooltipService = tooltipService;

        this.listeners = {
            in: () => this.handleShow(),
            out: () => this.handleHide(),
            click: () => {
                this.visible ? this.handleHide() : this.handleShow()
            },
            outside: event => this.handleOutside(event),
            resize: () => this.resizeThrottler()
        }
    }

    bind() {
        if (!this.validPositions.includes(this.position)) {
            this.position = 'top';
        }

        this.triggers = this.trigger.split(' ');
    }

    attached() {
        this.tooltipService.setTriggers(this.element, this.triggers, this.listeners);


        if (this.customPopover) {
            this.customPopover.style.display = 'none';
        }

        this.attached = true;
        if (this.isOpen) {
            this.handleShow();
        }
    }

    detached() {
        this.tooltipService.removeTriggers(this.element, this.triggers, this.listeners);
    }

    isOpenChanged() {
        if (!this.attached) {
            return;
        }

        if (this.isOpen) {
            this.handleShow();
        } else {
            this.handleHide();
        }
    }

    titleChanged() {
        this.valuesChanged = true;
    }

    textChanged() {
        this.valuesChanged = true;
    }

    positionChanged(newValue, oldValue) {
        if (!this.validPositions.includes(newValue)) {
            this.position = oldValue;
            return;
        }

        this.valuesChanged = true;
    }

    handleShow() {
        if (this.visible || this.disabled) {
            return;
        }

        if (!this.popover || this.valuesChanged) {
            this.createPopover();
            this.valuesChanged = false;
        }

        this.popover.setAttribute("style", `display: block;`);


        let position = this.tooltipService.calculatePosition(this.element, this.popover, this.position);
        this.popover.setAttribute("style", `top: ${position.top}px; left: ${position.left}px; display: block;`);


        velocity(this.popover, 'stop')
            .then(() => {
                velocity(this.popover, 'fadeIn')
                    .then(() => {
                        this.popover.classList.add('in');

                        if(typeof this.onOpen === 'function'){
                            this.onOpen();
                        }
                    });
            });

        this.visible = true;
        this.isOpen = true;

        window.addEventListener('resize', this.listeners.resize);
    }

    resizeThrottler() {
        if (!this.visible) {
            return;
        }

        if (!this.resizeTimeout) {
            this.resizeTimeout = setTimeout(() => {
                this.resizeTimeout = null;
                this.handleResize();
            }, 66);
        }
    }

    handleResize() {
        let position = this.tooltipService.calculatePosition();
        this.popover.setAttribute("style", `top: ${position.top}px; left: ${position.left}px`);
    }

    handleHide() {
        if (!this.visible) {
            return;
        }

        velocity(this.popover, 'stop')
            .then(() => {
                velocity(this.popover, 'fadeOut')
                    .then(() => {
                        this.popover.classList.remove('in');

                        if (typeof this.onClose === 'function') {
                            this.onClose();
                        }
                    });
            });

        this.visible = false;
        this.isOpen = false;

        window.removeEventListener('resize', this.listeners.resize);
    }

    handleOutside(event) {
        if (!this.visible) {
            return;
        }

        if (this.element !== event.target && !this.popover.contains(event.target)) {
            this.handleHide();
        }
    }

    getPositionClass() {
        return this.popover.classList.add((bootstrapOptions.version === 4 ? 'popover-' : '') + this.position);

    }

    createPopover() {
        if (this.customPopover) {
            this.popover = this.customPopover;
            this.popover.classList.add('popover');
            this.popover.classList.add(this.getPositionClass());
            return;
        }


        if (this.popover) {
            document.body.removeChild(this.popover);
        }

        this.popover = document.createElement('div');
        this.popover.classList.add('popover');
        this.popover.classList.add('popover-' + this.position);
        this.popover.classList.add(this.getPositionClass());


        let arrow = document.createElement('div');
        arrow.classList.add('arrow');
        this.popover.appendChild(arrow);

        if (this.title) {
            let title = document.createElement('h3');
            title.classList.add('popover-title');
            let titleText = document.createTextNode(this.title);
            title.appendChild(titleText);
            this.popover.appendChild(title);
        }


        let content = document.createElement('div');
        content.classList.add('popover-content');
        let contentParagraph = document.createElement('p');
        let text = document.createTextNode(this.text);
        contentParagraph.appendChild(text);
        content.appendChild(contentParagraph);
        this.popover.appendChild(content);

        document.body.appendChild(this.popover);
    }
}