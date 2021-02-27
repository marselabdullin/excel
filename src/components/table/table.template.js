import {toInlineStyles} from '@core/utils'
import {DEFAULT_STYLES} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
    A: 65,
    Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
    return function({index, width}) {
        const id = `${row}:${index}`
        const data = state.dataState[id] || ''
        const styles = toInlineStyles({
            ...DEFAULT_STYLES,
            ...state.stylesState[id],
        })

        return `<div 
            class="cell"
            contenteditable
            data-type="cell"
            data-col="${index}"
            data-id="${id}"
            data-value="${data}"
            style="${styles}; width: ${width}"
        >${parse(data)}</div>`
    }
}

function toColumn({col, index, width}) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(content, index = '', state = {}) {
    const height = getHeight(state, index)
    return `
        <div 
            class="row" 
            data-type="resizable"
            data-row="${index}"
            style="height: ${height}"
        >
            <div class="row-info">
                ${index && index + `<div class="row-resize" data-resize="row"></div>`}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
    return function(col, index) {
        return {col, index, width: getWidth(state, index)}
    }
}

export function createTable(rowsCount = 30, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(withWidthFrom(state.colState))
            .map(toCell(row, state))
            .join('')

        rows.push(createRow(cells, row + 1, state.rowState))
    }

    return rows.join('')
}
