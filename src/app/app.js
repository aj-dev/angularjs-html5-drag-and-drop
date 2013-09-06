/* global angular */
(function () {

    'use strict';

    angular.module('Dashboard', [])

        .controller('DashboardController', ['$scope',
            function ($scope) {
                // For handling the passed data after the object is dropped
                $scope.onDrop = function (data) {
                    //console.log(data);
                };
            }
        ])

        .directive('draggable', function () {

            var handler = {

                dragStart: function (e) {
                    var elemId = angular.element(e.target).attr('id');

                    angular.element(e.target).css({
                        opacity: 1
                    });

                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', elemId);
                },

                dragEnd: function (e) {
                    angular.element(e.target).css({
                        opacity: 1
                    });
                    e.preventDefault();
                }
            };

            return {
                restrict: 'A',
                link: function (scope, elem) {

                    elem.attr('draggable', 'true').bind('dragstart dragend', function (e) {
                        switch (e.type) {
                            case 'dragstart':
                                handler.dragStart(e);
                                break;
                            case 'dragend':
                                handler.dragEnd(e);
                                break;
                            default:
                                handler.dragEnd(e);
                        }
                    });
                }
            };
        })

        .directive('droppable', function () {

            return {
                restrict: 'A',
                link: function (scope, elem) {

                    var handler = {

                        dragEnter: function (e) {
                            e.dataTransfer.dropEffect = 'move';
                            elem.addClass('over'); // For giving highlighting effect on droppable object
                            e.preventDefault();
                        },

                        dragOver: function (e) {
                            elem.addClass('over');
                            e.preventDefault();
                        },

                        dragLeave: function (e) {
                            elem.removeClass('over'); // For removing highlighting effect on droppable object
                            e.preventDefault();
                        },

                        dropped: function (e) {
                            var elemId = e.dataTransfer.getData('text/plain'),
                                droppable = null;

                            if (elemId) {
                                droppable = angular.element(document.querySelector('#' + elemId)); // jqlite find() is limited to lookups by tag name.
                                elem.append(droppable);
                                scope.onDrop(droppable); // This will be called on the directive's parent scope
                            }
                            elem.removeClass('over');
                            e.stopPropagation();
                        }
                    };

                    elem.bind('dragenter dragover dragleave drop', function (e) {
                        switch (e.type) {
                            case 'dragenter':
                                handler.dragEnter(e);
                                break;
                            case 'dragover':
                                handler.dragOver(e);
                                break;
                            case 'dragleave':
                                handler.dragLeave(e);
                                break;
                            case 'drop':
                                handler.dropped(e);
                                break;
                            default:
                                handler.dragLeave(e);
                        }
                    });
                }
            };
        }
    );
}());
