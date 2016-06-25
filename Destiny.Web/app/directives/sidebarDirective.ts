///<reference path="../app.ts"/>


class SidebarDirective implements ng.IDirective
{

    public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
    //public template = 'abababa';
    public scope = {};
    private temp: any;

    constructor(/*list of dependencies*/)
    {
        this.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: any) =>
        {
            scope.$watch(attrs.sidebar, (newVal: any) => {
                if (newVal)
                {
                    element.addClass("show");
                    return;
                }
                element.removeClass("show");
            });
        };
    }

    public static factory()
    {

        const directive = () =>
        {
            return new SidebarDirective(/*list of dependencies*/);
        };

        directive["$inject"] = [];

        return directive;
    }
}

destiny.directive("sidebar", SidebarDirective.factory());

    
