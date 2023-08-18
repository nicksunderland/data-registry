import { defineStore } from 'pinia';

export const useConfigBuilderStore = defineStore('ConfigBuilderStore', {
    state: () => ({
        rawFields: [],
        selectedColumns: {},
        columnNameChange: [null, null],
        convertedFields: [],
        convertedFieldsConfig: [],
        unConvertedFieldsConfig: [],
        latestFieldRename: [null, null],
    }),
    getters: {
        getRawFields: (state) => state.rawFields,
        getSelectedColumns: (state) => state.selectedColumns,
        getConvertedFields: (state) => state.convertedFields,
        getConvertedFieldsConfig: (state) => state.convertedFieldsConfig,
        getAllFieldsConfig: (state) => state.unConvertedFieldsConfig.concat(state.convertedFieldsConfig),
        getLatestFieldRename: (state) => state.latestFieldRename
    },
    actions: {
        setRawFields(fields){
            this.rawFields = fields;
        },
        setSelectedColumns(columns){
            // TODO decide how to store the selected columns: object or array?
            let columnKeys = Object.keys(columns);
            let rawFieldItems = [];
            columnKeys.forEach(columnKey => {
                let rawFieldItem = {
                    "type": "raw",
                    "field name": columns[columnKey],
                    "raw field": columnKey
                };
                rawFieldItems.push(rawFieldItem);
            });
            this.unConvertedFieldsConfig = rawFieldItems;
            this.selectedColumns = columns;
        },
        setColumnNameChange(nameChange){
            this.columnNameChange = nameChange;
        },
        setConvertedFields(newConvertedFields){
            let fieldNames = [];
            newConvertedFields.forEach(newField => {
                if (newField["type"] == "split"){
                    fieldNames = fieldNames.concat(newField["field name"]);
                } else {
                    fieldNames.push(newField["field name"]);
                }
            });
            this.convertedFields = fieldNames;
            this.convertedFieldsConfig = newConvertedFields;
        },
        renameField(oldName, newName){
            this.latestFieldRename = [oldName, newName];
        }
    }
});