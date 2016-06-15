class DestinyFilter
{

    public static itemNameFilter()
    {
        return (input: string) =>
        {
            if (input)
            {
                const maxLength = 19;
                if (input.length >= maxLength)
                {
                    return input.substr(0, maxLength);
                }
                return input;
            }
        };
    }

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

    public static achievementNameFilter(sce: any, destinyDataService: DestinyDataService)
    {
        return (input: number) =>
        {
            if (input !== undefined)
            {
                const achievementName = destinyDataService.getAchievementNameById(input);
                return sce.trustAsHtml(achievementName);
            }
        };
    }

    public static bindHtmlFilter(sce: any)
    {
        return (input: any) =>
        {
            if (input !== undefined)
            {
                return sce.trustAsHtml(input);
            }
        };
    }
}

//Destiny.filter("damageTypeFilter", [DestinyFilter.damageTypeFilter]);
destiny.filter("damageTypeFilter", ($sce: any, destinyDataService: DestinyDataService) => DestinyFilter.damageTypeFilter($sce, destinyDataService));
destiny.filter("booleanFilter", ($sce: any, destinyDataService: DestinyDataService) => DestinyFilter.booleanFilter($sce, destinyDataService));
destiny.filter("itemNameFilter", () => DestinyFilter.itemNameFilter());
destiny.filter("bindHtmlFilter", ($sce: any) => DestinyFilter.bindHtmlFilter($sce));
destiny.filter("achievementNameFilter", ($sce: any, destinyDataService: DestinyDataService) => DestinyFilter.achievementNameFilter($sce, destinyDataService));
