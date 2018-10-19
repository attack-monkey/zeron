export function mapJoin(map, mapTo) {
    return Object.keys(map).map(key => {
        return mapTo(key);
    }).join('');
}