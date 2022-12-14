export const all = state => state.items;

export const allNonEmpty = state => {
    return state.items.filter(item => item.cards > 0)
};

export const getEditingTag = state => state.editing;

export const getRecentlyUpdated = state => {
    return state.items.sort(function(a, b) {
        return new Date(a) - new Date(b)
    }).slice(0, 5)
};

export const isCreating = state => state.actionCreateStatus === 'Request';
export const isUpdating = state => state.actionUpdateStatus === 'Request';