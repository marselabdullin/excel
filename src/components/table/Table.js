import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@core/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(event, this.$root)
        }
    }

    toHTML() {
        return createTable(30)
    }
}
