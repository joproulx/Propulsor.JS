define(["require", "exports"], function(require, exports) {
    

    var AccordionControl = (function () {
        function AccordionControl(id, headerWidth, headerHeight, styleProps) {
            this._currentlyShown = -1;
            this._id = id;
            this._elements = [];

            this._headerHeight = headerHeight;
            this._headerWidth = headerWidth;
            this._styleProps = this.convertStylePropsToString(styleProps);

            this._rootElement = $('<div/>', {
                id: 'accordion_' + this._id
            });
        }
        AccordionControl.prototype.toJQuery = function () {
            return this._rootElement;
        };

        AccordionControl.prototype.convertStylePropsToString = function (props) {
            var result = 'position:relative;vertical-align:middle;';
            _.each(props, function (item, index) {
                result += item[0] + ':' + item[1] + ';';
            }, this);
            return result;
        };

        AccordionControl.prototype.addElements = function (elements) {
            _.each(elements, function (item, index) {
                this.addHeaderAndContent(item.Element, item.Title);
            }, this);
        };

        AccordionControl.prototype.addHeaderAndContent = function (item, title) {
            var index = this._elements.length;

            var divContainer = $('<div/>', {
                id: 'accordion_container_' + index
            }).appendTo(this._rootElement);

            var divHeader = $('<div/>', {
                id: 'accordion_header',
                style: this._styleProps,
                height: this._headerHeight + 'px',
                width: this._headerWidth + 'px'
            }).appendTo(divContainer);

            $('<div/>', {
                height: '3px'
            }).appendTo(divContainer);

            var divContent = $('<div/>', {
                id: 'accordion_content'
            }).appendTo(divContainer);

            item.appendTo(divContent);

            var divRef = $('<span/>', {
                id: 'toggleControl',
                text: '[+]',
                style: 'cursor:pointer;'
            }).appendTo(divHeader);

            divHeader.click($.proxy(function () {
                this.doAccordion(index);
            }, this));

            divHeader.append(title);

            divContent.hide();

            this._elements[index] = divContainer;
        };

        AccordionControl.prototype.doAccordion = function (index) {
            if (this._currentlyShown !== -1) {
                var currentElementContainer = this._elements[this._currentlyShown];
                var currentElementContent = currentElementContainer.find('div#accordion_content');
                var currentElementToggleControl = currentElementContainer.find('span#toggleControl');

                currentElementContent.hide(1000);
                currentElementToggleControl.text('[+]');
                if (this._currentlyShown === index) {
                    this._currentlyShown = -1;
                    return;
                }
            }

            var selectedElementContainer = this._elements[index];
            var selectedElementContent = selectedElementContainer.find('div#accordion_content');
            var selectedElementToggleControl = selectedElementContainer.find('span#toggleControl');

            selectedElementContent.show(1000);
            selectedElementToggleControl.text('[-]');
            this._currentlyShown = index;
        };
        return AccordionControl;
    })();
    return AccordionControl;
});
//# sourceMappingURL=AccordionControl.js.map
