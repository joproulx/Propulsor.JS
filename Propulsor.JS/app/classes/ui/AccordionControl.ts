export = AccordionControl;


class AccordionControl {
    private _id: string;
    private _elements: JQuery[];
    private _rootElement: JQuery;
    private _styleProps: string;
    private _headerHeight: number;
    private _headerWidth: number;
    private _currentlyShown: number = -1;

    constructor(id: string, headerWidth: number, headerHeight: number, styleProps: string[][]) {
        this._id = id;
        this._elements = [];
        
        this._headerHeight = headerHeight;
        this._headerWidth = headerWidth;
        this._styleProps = this.convertStylePropsToString(styleProps);

        this._rootElement = $('<div/>', {
            id: 'accordion_' + this._id,
        });
    }

    public toJQuery(): JQuery {
        return this._rootElement;
    }

    private convertStylePropsToString(props: string[][]): string {
        var result = 'position:relative;vertical-align:middle;';
        _.each(props, function (item, index) {
            result += item[0] + ':' + item[1] + ';'
        }, this);
        return result;
    }

    public addElements(elements: { Element: JQuery; Title: string; }[]) {
        _.each(elements, function (item, index) {
            this.addHeaderAndContent(item.Element, item.Title);
        }, this)
    }

    private addHeaderAndContent(item: JQuery, title: string) {
        var index = this._elements.length;

        var divContainer = $('<div/>', {
            id: 'accordion_container_' + index,
        }).appendTo(this._rootElement);

        var divHeader = $('<div/>', {
            id: 'accordion_header',
            style: this._styleProps,
            height: this._headerHeight + 'px',
            width: this._headerWidth + 'px',
        }).appendTo(divContainer)
          
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
            }, this))

        divHeader.append(title);

        divContent.hide();

        this._elements[index] = divContainer;
    }

    private doAccordion(index: number) {
        

        if (this._currentlyShown !== -1) {
            var currentElementContainer: JQuery = this._elements[this._currentlyShown];
            var currentElementContent: JQuery = currentElementContainer.find('div#accordion_content');
            var currentElementToggleControl = currentElementContainer.find('span#toggleControl');
            
            currentElementContent.hide(1000);
            currentElementToggleControl.text('[+]');
            if (this._currentlyShown === index) {
                this._currentlyShown = -1;
                return;
            }
        }

        var selectedElementContainer: JQuery = this._elements[index];
        var selectedElementContent: JQuery = selectedElementContainer.find('div#accordion_content');
        var selectedElementToggleControl = selectedElementContainer.find('span#toggleControl');

        selectedElementContent.show(1000);
        selectedElementToggleControl.text('[-]');
        this._currentlyShown = index;
    }


}

