export const getById = state => {
    return id => {
        if (state.items.length === 0) {
            return undefined;
        }
        return state.items.find(item => item.id === id);
    }
};

export const getItems = state => state.items;
export const getFavouriteFilterTags = state => state.favouriteFilterTags;
export const getGlossaryFilterTags = state => state.glossaryFilterTags;

export const getFilteredItems = state => {
    return filter => {
        const result = [],
            name = filter.name.toLowerCase(),
            shorthand = filter.shorthand.toLowerCase(),
            description = filter.description.toLowerCase();

        state.items.forEach(item => {
            if (name !== '') {
                if (item.name.toLowerCase().indexOf(name) === -1) {
                    return;
                }
            }
            if (shorthand !== '') {
                if (!item.shorthand || !item.shorthand.length) {
                    return;
                }
                let isInList = false;
                for (let i in item.shorthand) {
                    if (item.shorthand[i].toLowerCase().indexOf(shorthand) !== -1) {
                        isInList = true;
                    }
                }
                if (!isInList) {
                    return;
                }
            }
            if (description !== '') {
                if (item.description.toLowerCase().indexOf(description) === -1) {
                    return;
                }
            }
            if (filter.tag !== '') {
                if (!item.tags || !item.tags.length) {
                    return;
                }
                let isInTags = false;
                for (let i in item.tags) {
                    if (item.tags[i].id === filter.tag) {
                        isInTags = true;
                    }
                }
                if (!isInTags) {
                    return;
                }
            }
            result.push(item)
        });
        return result;
    }
};

export const getRecentlyUpdated = state => state.recently;

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';
export const isCardLoading = state => state.actionGetStatus === 'Request';
export const isCardsLoading = state => state.actionAllStatus === '' || state.actionAllStatus === 'Request';
