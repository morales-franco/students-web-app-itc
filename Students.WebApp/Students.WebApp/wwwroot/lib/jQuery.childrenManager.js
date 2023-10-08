(function ($) {

    instanceId = 0;

    $.fn.childrenManager = function (collectionName, collectionItems, options, indexDataSource, currentDataSourceItem) {

        var defaultOptions = { indexFormId: 'partialIndex', abmFormId: 'partialAbm', controlsSelector: 'textarea,input[type=text],input[type=hidden],input[type=number],select,input[type=checkbox]', validationSelector: '.text-danger,.field-validation-error', validationValidClass: 'field-validation-valid', validationErrorClass: 'field-validation-error', inputValidClass: 'valid', inputErrorClass: 'input-validation-error' };

        indexDataSource = [];

        currentDataSourceItem = null;

        var current = this;

        var abortHide = false;

        this.getCurrent = function () {
            return current;
        }
        this.getOptions = function () {
            return options;
        }

        this.getIndexFormId = function () {
            return this.getOptions().indexFormId;
        }

        this.getIndexForm = function () {
            return $('#' + this.getOptions().indexFormId);
        }

        this.getAbmFormId = function () {
            return this.getOptions().abmFormId;
        }

        this.getAbmForm = function () {
            return $('#' + this.getOptions().abmFormId);
        }

        this.getControlsSelector = function () {
            return this.getOptions().controlsSelector;
        }

        this.getValidationValidClass = function () {
            return this.getOptions().validationValidClass;
        }

        this.getValidationErrorClass = function () {
            return this.getOptions().validationErrorClass;
        }

        this.getInputValidClass = function () {
            return this.getOptions().inputValidClass;
        }

        this.getInputErrorClass = function () {
            return this.getOptions().inputErrorClass;
        }

        this.getControls = function () {

            var controlsToValidate = null;

            if (this.getControlsSelector()) {
                if (this.getControlsSelector() != '') {
                    controlsToValidate = $(this.getControlsSelector(), this.getAbmForm());
                }
                else {
                    controlsToValidate = $(defaultOptions.controlsSelector, this.getAbmForm());
                }
            } else {
                controlsToValidate = $(defaultOptions.controlsSelector, this.getAbmForm());
            }

            return controlsToValidate;
        }

        this.getValidationControls = function () {
            return $(this.getOptions().validationSelector, this.getAbmForm());
        }

        this.getAbmCancelButton = function () {
            return current.getAbmForm().find('[data-childaction="cancel"]');
        }

        this.getAbmAcceptButton = function () {
            return current.getAbmForm().find('[data-childaction="accept"]');
        }

        this.getIndexDataSource = function () {
            return indexDataSource;
        }

        this.getIndexDataSourceWithCompleteNames = function () {

            var result = [];

            $(indexDataSource).each(function (idx, dataSourceItem) {
                var newElement = [];

                $(dataSourceItem).each(function (fieldIdx, field) {
                    var newField = {};
                    newField.name = collectionName + '[' + idx + ']' + '.' + field.name;
                    newField.value = field.value;
                    newElement.push(newField);
                });

                result.push(newElement);
            });


            return result;
        }

        this.getcurrentDataSourceItem = function () {
            return currentDataSourceItem;
        }

        this.getCollectionName = function () {
            return collectionName;
        }

        this.getJSONArrayFromDataSource = function (dataSourceArray) {

            if (dataSourceArray == undefined || dataSourceArray.length == 0) return '[]';
            var result = '[';

            $(dataSourceArray).each(function (idx, dataSourceItem) {
                var element = '{';
                $(dataSourceItem).each(function (fieldIdx, field) {
                    var size = Object.keys(field).length;
                    if (Array.isArray(dataSourceItem)) {
                        element += '"' + field.name + '":"' + field.value + '",';
                    } else {
                        if (size > 1) {
                            $(Object.keys(field)).each(function (j, key) {
                                element += '"' + key + '":"' + field[key] + '",';
                            });
                        }
                    }
                });

                element = element.substr(0, element.length - 1); //removes coma

                element += '}';
                result += element + ",";
            });

            result = result.substr(0, result.length - 1); //removes coma

            result += ']';
            return result;
        }

        this.validateAbm = function () {
            var isValidDiv = true;

            var validator = $('form').validate();

            this.getControls().each(function (idx, element) {
                var isValidField = $(element).valid();
                isValidDiv = isValidDiv && isValidField;
            });

            return isValidDiv;
        }

        this.clearAbmValidation = function () {
            var errorClass = this.getValidationErrorClass();
            var validClass = this.getValidationValidClass();

            var inputErrorClass = this.getInputErrorClass();
            var inputValidClass = this.getInputValidClass();

            this.getValidationControls().each(function (idx, element) {
                $(element).removeClass(errorClass).addClass(validClass).empty();
            });

            this.getControls().each(function (idx, element) {
                $(element).removeClass(inputErrorClass).addClass(inputValidClass);
            });
        }

        this.clearAbmFields = function () {
            this.getControls().each(function (idx, element) {

                $(element).val('');

                if ($(element).is("input[type = checkbox]")) {
                    $(element).attr("checked", false);
                }

                if ($(element).is("select")) {
                    $(element).find("option").removeAttr("selected");
                    $(element).find("option").eq(0).prop("selected", true);
                }

            });

            current.clearAbmFieldsExtra();
        }

        this.clearAbmFieldsExtra = function () {

        }

        this.resetAbmFieldsStyle = function () {

            this.getControls().each(function (idx, element) {
                $(element).removeAttr('disabled');
            });

            current.getAbmAcceptButton().css('display', '');
        }

        this.setAbmFields = function (indexDataSourceItem, disable) {

            $(indexDataSourceItem).each(function (idx, item) {

                var abmField = $('[name="' + item.name + '"]', current.getAbmForm());

                if (abmField.length > 0) {

                    if (item.value == null) {
                        if (disable) {
                            $(abmField).attr('disabled', 'disabled');
                        } else {
                            $(abmField).removeAttr('disabled');
                        }
                        return null;
                    }

                    current.setFieldValue(abmField, item);

                    if (disable) {
                        current.getAbmAcceptButton().css('display', 'none');
                        $(abmField).attr('disabled', 'disabled');
                    } else {
                        current.getAbmAcceptButton().css('display', '');
                        $(abmField).removeAttr('disabled');
                    }

                    current.setAbmFieldsExtra(idx, item);
                }

            });

        };

        this.setAbmFieldsExtra = function (idx, item) {

        }

        this.setFieldValue = function (abmField, item) {
            if (item.value.toString().toLowerCase() == 'true' || item.value.toString().toLowerCase() == 'false') {
                var newValue = item.value.toString().toLowerCase().replace('t', 'T').replace('f', 'F');
                $(abmField).val(newValue);
            } else if (typeof item.value == "string" && item.value.indexOf("/Date(") > -1) {
                var newValue = new Date(parseInt(item.value.substr(6, (item.value.length - 8))));
                newValue = newValue.yyyyMMdd_Date();
                $(abmField).val(newValue);
            }
            else {
                $(abmField).val(item.value);
            }
        };

        this.saveToCollection = function () {

            if (current.validateAbm()) {
                current.addToCollection();
                abortHide = false;
            } else {
                abortHide = true;
            }

        }

        this.cancelAdd = function () {
            abortHide = false;
            currentDataSourceItem = null;
        }

        this.setDataItemId = function () {
            var dataItemId = {};
            dataItemId.name = 'Id';
            dataItemId.value = (indexDataSource.length + 1) * (-1);
            return dataItemId;
        }

        this.addToCollection = function () {

            var indexDataSourceItem = [];

            if (currentDataSourceItem == null) {

                currentDataSourceItem = indexDataSourceItem;

                var dataItemId = {};
                dataItemId.name = 'Id';
                dataItemId.value = (this.getIndexDataSource().length + 1) * (-1);
                indexDataSourceItem.push(dataItemId);

                this.getControls().each(function (idx, element) {

                    var dataItem = {};

                    dataItem.name = $(element).attr('name');
                    dataItem.value = $(element).val();

                    indexDataSourceItem.push(dataItem);
                });

                var extraData = this.getAditionalDataFromItem();
                if (extraData != null) {
                    $(extraData).each(function (idx, dataItem) {
                        indexDataSourceItem.push(dataItem);
                    });
                }
                
                this.getIndexDataSource().push(indexDataSourceItem);
                this.addToIndex(indexDataSourceItem);

            } else {

                var aux = [];
                var elementIndex;

                $(indexDataSource).each(function (i, elem) {
                    //if (elem[0].value != currentDataSourceItem[0].value) {
                    //    aux.push(elem);
                    //}
                    if (elem[0].value == currentDataSourceItem[0].value) {
                        elementIndex = i;
                    }
                });

                //indexDataSource = aux;

                var dataItemId = {};
                dataItemId.name = 'Id';
                dataItemId.value = currentDataSourceItem[0].value;

                indexDataSourceItem.push(dataItemId);

                this.getControls().each(function (idx, element) {

                    var dataItem = {};

                    dataItem.name = $(element).attr('name');
                    dataItem.value = $(element).val();

                    indexDataSourceItem.push(dataItem);
                });

                var extraData = this.getAditionalDataFromItem();
                if (extraData != null) {
                    $(extraData).each(function (idx, dataItem) {
                        indexDataSourceItem.push(dataItem);
                    });
                }
       
                
                
                // Change for getMergeObject Object.assign(indexDataSource[elementIndex], indexDataSourceItem);
                indexDataSource[elementIndex] = this.getMergeObject(indexDataSource[elementIndex], indexDataSourceItem);

                this.changeInIndex(indexDataSourceItem);
            }

            currentDataSourceItem = null;
        }

        this.getMergeObject= function (source, changeData) {
            var mergeArray = [];

            $.each(source, function (index, value) {
                var item = changeData.filter(function (keyvalue) {
                    return keyvalue.name == value.name;
                });

                if (item.length > 0) {
                    mergeArray.push(Object.assign({}, value, item[0]));
                } else {
                    mergeArray.push(value);
                }
            });

            return mergeArray;
        }

        this.getAditionalDataFromItem = function () {
            return null;
        }

        this.addToIndex = function (indexDataSourceItem) {

            var indexTable = this.getIndexForm();

            var indexTableColumns = $('tr th', indexTable);

            var currentId = indexDataSourceItem[0].value;

            var indexTableRow = $('<tr data-itemid="' + currentId + '"></tr>');

            $(indexTableColumns).each(function (idx, column) {

                $(indexDataSourceItem).each(function (i, item) {

                    if ($(column).data('boundto') == item.name) {

                        var indexTableCell = current.addIndexTableCell(item.name, item.value, currentId, idx);
                        $(indexTableRow).append(indexTableCell);

                    }
                });
            });

            $(indexTableRow).append(current.addIndexTableActionCell(currentId));

            indexTable.append(indexTableRow);
        }

        this.addIndexTableCell = function (name, value, itemId, columnIdx) {
            var indexTableCell = $('<td data-boundto="' + name + '"></td>').html(current.setIndexTableCellContent(name, value, itemId));
            return indexTableCell;
        }

        this.setIndexTableCellContent = function (name, value, itemId) {
            if (value == null) {
                return '';
            }

            if (typeof value == "string" && value.indexOf("/Date(") > -1) {
                value = new Date(parseInt(value.substr(6, (value.length - 8))));
                value = value.yyyyMMdd_Date();
            }

            return value.toString();
        }

        this.setCurrentDataSourceItem = function (item) {
            currentDataSourceItem = item;
        }

        this.addIndexTableActionCell = function (currentId) {

            var indexTableActionCell = $('<td></td>');

            var editLink = $(current.addIndexTableEditButton()).click(function () {
                current.editDataSourceItem(currentId);
            });

            var detailsLink = $(current.addIndexTableViewButton()).click(function () {
                current.viewDataSourceItem(currentId);
            });

            var deleteLink = $(current.addIndexTableDeleteButton()).click(function () {
                current.deleteDataSourceItem(currentId);
            });

            indexTableActionCell.append(editLink);

            indexTableActionCell.append(current.addIndexTableButtonSeparator());

            indexTableActionCell.append(detailsLink);

            indexTableActionCell.append(current.addIndexTableButtonSeparator());

            indexTableActionCell.append(deleteLink);

            return indexTableActionCell;
        }

        this.addIndexTableEditButton = function () {
            return $('<a data-toggle="modal" href="#' + current.getAbmFormId() + '">' + current.addIndexTableEditText() + '</a>');
        }

        this.addIndexTableViewButton = function () {
            return $('<a data-toggle="modal" href="#' + current.getAbmFormId() + '">' + current.addIndexTableViewText() + '</a>');
        }

        this.addIndexTableDeleteButton = function () {
            return $('<a href="#" class="deleteLink">' + current.addIndexTableDeleteText() + '</a>');
        }

        this.addIndexTableEditText = function () {
            return 'Edit';
        }

        this.addIndexTableViewText = function () {
            return 'View';
        }

        this.addIndexTableDeleteText = function () {
            return 'Delete';
        }

        this.addIndexTableButtonSeparator = function () {
            return $('<span> | </span>');
        }

        this.changeInIndex = function (indexDataSourceItem) {

            var indexTable = this.getIndexForm();

            var currentId = indexDataSourceItem[0].value;

            var indexTableRow = $('tr[data-itemid="' + currentId + '"]', indexTable);

            $(indexDataSourceItem).each(function (idx, item) {

                $(indexTableRow).children('td[data-boundto="' + item.name + '"]').html(current.setIndexTableCellContent(item.name, item.value, currentId));

            });
        }

        this.editDataSourceItem = function (id) {

            var indexDataSourceItem = null;
            var indexItemEdit = 0;

            $(indexDataSource).each(function (i, elem) {

                if (elem[0].value == id) {
                    indexDataSourceItem = elem;

                    currentDataSourceItem = elem;
                    indexItemEdit = i;
                }

            });

            current.resetAbmFieldsStyle();//agregado
            this.setAbmFields(indexDataSourceItem);
            current.editDataSourceItemExtra(id, indexItemEdit);
        }
        this.editDataSourceItemExtra = function (id, indexItemEdit) {
            return null;
        }

        this.viewDataSourceItem = function (id) {

            var indexDataSourceItem = null;
            var indexItemView = 0;

            $(indexDataSource).each(function (i, elem) {

                if (elem[0].value == id) {
                    indexDataSourceItem = elem;

                    currentDataSourceItem = elem;
                    indexItemView = i;
                }

            });

            this.setAbmFields(indexDataSourceItem, true);
            current.viewDataSourceItemExtra(id, indexItemView);
        }

        this.viewDataSourceItemExtra = function (id, indexItemView) {
            return null;
        }

        this.deleteDataSourceItem = function (id) {

            var indexTableColumns = $('tr[data-itemid="' + id + '"]', this.getIndexForm());

            $(indexTableColumns).remove();

            var aux = [];

            $(indexDataSource).each(function (i, elem) {

                if (elem[0].value != id) {
                    aux.push(elem);
                }
            });

            indexDataSource = aux;
            current.deleteDataSourceItemExtra(id);

        }

        this.deleteDataSourceItemExtra = function (id) {
            return null;
        }

        this.appendToSubmitForm = function () {

            $(indexDataSource).each(function (i, elem) {
                current.appendItemToSubmitForm(i, elem);
            });

        }

        this.appendItemToSubmitForm = function (idx, item) {

            $(item).each(function (i, elem) {

                if (elem != null && elem != undefined && Array.isArray(elem.value)) {
                    $(elem).each(function (j, subElement) {
                        current.appendItemToSubmitForm(j, subElement.value);
                    });
                }
                else {

                    var hiddenField = current.createFieldToSubmit(idx, elem.name, elem.value);
                }
                $('form').append(hiddenField);

            });

            current.appendItemExtraDataToSubmitForm(idx, item);
        }

        this.appendItemExtraDataToSubmitForm = function (idx, item) {

        }

        this.createFieldToSubmit = function (idx, name, value) {

            var hiddenField = $('<input type="hidden" class="child-field-hidden-' + current.getOptions().indexFormId +'" />');
            hiddenField.attr('name', collectionName + '[' + idx + '].' + name);
            hiddenField.val(value);

            return hiddenField;
        }

        this.createIndex = function () {

            $.each(indexDataSource, function (idx, item) {

                current.addToIndex(item);

            });
        }
        this.onModalShow = function () {
        }

        this.ready(function () {
            if (collectionItems != undefined && collectionItems != null) {//agregado
                var loadedItems = JSON.parse(collectionItems);

                $.each(loadedItems, function (idx, item) {

                    var indexDataSourceItem = [];

                    var keys = Object.keys(item);

                    keys.forEach(function (key) {

                        var dataItem = {};
                        //MARTIN
                        if (typeof item[key] == "string" && item[key].indexOf("/Date(") > -1) {
                            item[key] = new Date(parseInt(item[key].substr(6, (item[key].length - 8))));
                            item[key] = item[key].yyyyMMdd_Date();
                        }


                        dataItem.name = key;
                        dataItem.value = item[key];

                        indexDataSourceItem.push(dataItem);

                    });

                    indexDataSource.push(indexDataSourceItem);
                });
            }

            current.createIndex();

            current.getAbmCancelButton().click(function () {
                current.cancelAdd()
            });

            current.getAbmAcceptButton().unbind('click').click(function () {
                current.saveToCollection()
            });

            current.getAbmForm().on('show.bs.modal', function () {
                current.onModalShow();
            });

            current.getAbmForm().on('hide.bs.modal', function () {
                return !abortHide;
            });

            current.getAbmForm().on('hidden.bs.modal', function () {
                current.clearAbmFields();
                current.resetAbmFieldsStyle();
                current.clearAbmValidation();
            });

            current.clearAbmFields();

            var form = $('form');

            form.submit(function () {
                $('input.child-field-hidden-' + current.getOptions().indexFormId).remove();
                current.appendToSubmitForm();

            });

        });

        return this.each(function () {

            options = $.extend({}, defaultOptions, options);
            $.childrenManagerInstanceCreator(this, collectionName, collectionItems, options);

        });
    }

    $.childrenManagerInstanceCreator = function (target, collectionName, collectionItems, options) {
        return target.childrenManager || (target.childrenManager = new $.childrenManagerInstance(target, collectionName, collectionItems, options));
    }

    $.childrenManagerInstance = function (target, collectionName, collectionItems, options) {
        instanceId++;
    }

})(jQuery);

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
};

Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy; // padding
};

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + (dd[1] ? dd : "0" + dd[0]); // padding
};

Date.prototype.yyyyMMdd_Date = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};

