export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this. current = null
    }

    get selectedIds() {
        return this.group.map(($el) => $el.id())
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    selectGroup($group) {
        this.clear()
        this.group = $group
        this.group.forEach(($el) => $el.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach(($el) => $el.css(style))
    }

    clear() {
        this.group.forEach(($cell) => $cell.removeClass(TableSelection.className))
        this.group = []
    }
}
