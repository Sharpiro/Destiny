///<reference path="../app.ts"/>


class PopupDirective implements ng.IDirective
{

    public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
    //public template = "<span>{{label}}</span>";
    public scope = {};
    private temp: any;
    //public priority = 1001;
    public restrict = "AE";
    //public transclude = true;

    constructor($compile?: any)
    {
        this.link = (scope: any, element: any, attrs: any) =>
        {
            //scope.$watch(attrs.testattr, (newValue: any, oldValue: any) => {
            //element.html(input);
            element.removeAttr("popup");
            element.attr("popover", "123 testing content");
            element.attr("popover-trigger", "mouseenter");
            element.attr("popover-placement", "bottom");
            element.attr("popover-popup-delay", 300);
            $compile(element)(scope);
            //setTimeout(() =>
            //{
            //    //scope.$apply();
            //    scope.$digest();
            //}, 2000);
            //scope.label = "testing label";
            //});
        };
    }

    public static factory()
    {

        const directive = ($compile: any) =>
        {
            return new PopupDirective($compile);
        };

        directive["$inject"] = ["$compile"];

        return directive;
    }
}

masterSite.directive("popup", PopupDirective.factory());

    
