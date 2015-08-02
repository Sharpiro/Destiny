class DestinyFilter
{
    public static damageTypeFilter(sce: any, destinyDataService: DestinyDataService)
    {
        return (input: number) =>
        {
            if (input)
            {
                let url: string;
                switch (input)
                {
                    case 0:
                        url = null;
                        break;
                    case 2:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.arc;
                        break;
                    case 3:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.solar;
                        break;
                    case 4:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.void;
                        break;
                    default:
                        url = null;
                        break;
                }
                const html = url == null ? null : `<img src="${url}" class="damageTypeIcon"/>`;
                return sce.trustAsHtml(html);
            }
        };
    }

    public static booleanFilter(sce: any, destinyDataService: DestinyDataService)
    {
        return (input: boolean) =>
        {
            if (input !== undefined)
            {
                const url = input ? destinyDataService.getDestinyLinks().icons.booleanIcons.trueIcon : destinyDataService.getDestinyLinks().icons.booleanIcons.falseIcon;
                const html = `<img src="${url}" class="damageTypeIcon"/>`;
                return sce.trustAsHtml(html);
            }
        };
    }
}

//masterSite.filter("damageTypeFilter", [DestinyFilter.damageTypeFilter]);
masterSite.filter("damageTypeFilter", ($sce: any, destinyDataService: DestinyDataService) => DestinyFilter.damageTypeFilter($sce, destinyDataService));
masterSite.filter("booleanFilter", ($sce: any, destinyDataService: DestinyDataService) => DestinyFilter.booleanFilter($sce, destinyDataService));