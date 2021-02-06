import {ExcelComponents} from '@core/ExcelComponents'
import {createTable} from '@core/table.template'

export class Table extends ExcelComponents {
    static className = 'excel__table'

    toHTML() {
        return createTable(30)
    }
}
