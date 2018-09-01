(function () {


    angular.module('myModule', ['ui.bootstrap']);

    //var x13 = angular.module('mainModule', ['ngResource', 'ui.ace', 'myModule', 'ngLoadScript', 'ngFileUpload', 'angularFileUpload']);


    x13.directive('loading', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading"><div class="loadingContent"><img src="/img/loader.gif" width="20" height="20" /> {{loadingStage}}</div></div>',
            link: function (scope, element, attr) {
                scope.$watch('loading', function (val) {
                    if (val) {
                        $(element).show();
                    }
                    else {
                        $(element).hide();
                    }
                });
            }
        }
    });


    x13.controller('MainController', ['$scope', function ($scope) {

        $scope.templates = [
            {name: 'Solr/Lucene', page: 'settingsSolr.html'},
            {name: 'Terrier', page: 'settingsTerrier.html'},
            {name: 'Lemur', page: 'lemur.html'}
        ];

        $scope.submit = function () {
            if (form.file.$valid && $scope.file && !$scope.file.$error) {
                $scope.upload($scope.file);
            }
        }

    }]);


    var gems = [
        {name: 'Azurite', price: 110.50},
        {name: 'Bloodstone', price: 22.90},
        {name: 'Zircon', price: 1100}
    ];


    <!-- search controller for requesting solr  -->
    x13.controller('SearchController', ['$http', '$rootScope', '$scope', 'Upload', 'FileUploader', "CommonConfig",
        function ($http, $rootScope, $scope, Upload, FileUploader, CommonConfig) {

            var startPage = "startPage.html";
            $scope.ipAddresse = '127.0.0.1';
            $scope.resultPage = "resultPage.html";
            $scope.products = gems;
            $scope.templates = [
                {name: 'Solr/Lucene', page: 'settingsSolr.html'},
                {name: 'Terrier', page: 'settingsTerrier.html'},
                {name: 'Common configuration', page: 'commonSettings.html'}
            ];

            /*$scope.players = [];
             $scope.players.push(new CommonConfig(""));
             */



            /**
             * saves commonConfig.
             */
            saveCommonConfig = function () {
                var url = 'http://' + $scope.ipAddresse + ':8984/solr/collection1/updatePath';
                var name = $('#name').val();
                var description = $('#description').val();
            };


            $scope.selectedPage = startPage;

            $scope.colUploader = new FileUploader({
                url: 'http://' + $scope.ipAddresse + ':8080/terrier/saveTestCollection',
                queueLimit: 1
            });

            $scope.qrelsUploader = new FileUploader({
                url: 'http://' + $scope.ipAddresse + ':8080/terrier/saveTestCollection',
                queueLimit: 1
            });

            $scope.topicsUploader = new FileUploader({
                url: 'http://' + $scope.ipAddresse + ':8080/terrier/saveTestCollection'
            });

            this.selectSearchEngine = function (page) {
                $scope.selectedPage = page;
            };

            this.selectPage = function (page) {
                $scope.selectedPage = page;
            };

            this.displaySolrConfigDescription = function (file) {
                for (var i = 0; i < $scope.solrConfigResult.length; i++) {
                    if ($scope.solrConfigResult[i].name == file) {
                        $scope.solrConfigFileDescription = $scope.solrConfigResult[i].description;
                        break;
                    }
                }
            };

            this.displayTerrierConfigDescription = function (file) {
                for (var i = 0; i < $scope.terrierConfigResult.length; i++) {
                    if ($scope.terrierConfigResult[i].name == file) {
                        $scope.terrierLoadFile = file;
                        $scope.terrierConfigFileDescription = $scope.terrierConfigResult[i].description;
                        break;
                    }
                }
            };


            $scope.searchForm = {};
            $scope.settingsForm = {};
            $scope.settingsForm.aceLoaded = function (_editor) {
                //TODO later
            };

            $scope.settingsForm.aceChanged = function (e) {
                //alert(e);
            };


            $scope.searchForm.searchTerm = null;

//          this.products = gems;
            $scope.settingsForm.selectedSearchHandler = null;
            $scope.settingsForm.searchHandlerNames = [];
            $scope.settingsForm.searchHandlerName = [];
            $scope.settingsForm.searchComponents = [];
            $scope.settingsForm.defaultComponents = [];
            $scope.settingsForm.firstComponents = ["tvComponent"];
            $scope.settingsForm.lastComponents = ["spellcheck"];

            //todo read this 4 attributes from the retrieved updateHandler
//          $scope.updateHandlerName = "org.apache.solr.update.DirectUpdateHandler2";


            $scope.settingsForm.autoCommitMaxDocs = null;
            $scope.settingsForm.autoCommitMaxTime = null;
            $scope.settingsForm.autoSoftCommitMaxDocs = null;
            $scope.settingsForm.autoSoftCommitMaxTime = null;
            $scope.settingsForm.openSearcher = null;
            $scope.settingsForm.updateClassName = null;
            $scope.settingsForm.commitIntervalLowerBound = null;
            $scope.settingsForm.commitWithinSoftCommit = null;
            $scope.settingsForm.indexWriterCloseWaitsForMerges = null;
            $scope.settingsForm.solrConfigContent = "";
            $scope.settingsForm.terrierConfigContent = "";
            $scope.searchForm.terrierResults = [];
            $scope.searchForm.solrResults = [];
            $scope.solrConfigResult = [];
            $scope.solrSchemaResult = [];
            $scope.terrierConfigResult = [];
            $scope.terrierSelectedConfig = [];
            $scope.solrConfigFileDescription = "";
            $scope.terrierConfigFileDescription = "";
            $scope.solrSelectedConfig = [];
            $scope.solrSelectedSchema = {"name": "select schema", "description": ""};
            $scope.loadingStage = '';
            $scope.loading = false;
            $scope.terrierLoadFile = null;
            $scope.solrTestConfigurations = [];
            $scope.solrConfigurations = [];
            $scope.terrierTestConfigurations = [];
            $scope.collectionInfo = [];
            $scope.terrierConfigurations = [];

            $scope.settingsForm.trecFilesList = null;
            $scope.trecFiles = [];
            $scope.collections = [];
            $scope.qrels = [];
            $scope.topics = [];

            $scope.dataSetList = [];
            $scope.selectedDataSets = [];
            $scope.selectedCollection = "";
            $scope.selectedQrels = [];
            $scope.selectedTopics = [];
            $scope.trecCompositionName = "sample";

            this.printOut = function (data) {
                alert(data);
            };

            $scope.collectionFile = '';
            $scope.qrelsFile = '';
            $scope.topicsFile = '';




            $scope.commonConfig = new CommonConfig();
            $scope.selectedCommonIndexer = "";
            $scope.selectedWeightingModel = "";
            $scope.commonStopWordsEnabled = false;
            $scope.selectedCommonStemmer = "";
            $scope.selectedCommonNormalizer = "";
            $scope.commonQueryExpansionEnabled = false;
            $scope.selectedCommonStemmerLang = "";
            $scope.commonConfigDescription = "";
            $scope.commonConfigName = "";
            $scope.selectedCommonQueryOperator = "OR";
            $scope.commonSplitOnWhiteSpace = true;
            $scope.weightK1 = "";
            $scope.weightB = "";
            $scope.commonTokenizer = "";
            $scope.commonTokenizerLang = "";


            $scope.uploadPic = function (file) {

                var f = file,
                    r = new FileReader();
                r.onloadend = function (e) {
                    var data = e.target.result;
                    alert(data);
                    //send you binary data via $http or $resource or do anything else with it
                };
                r.readAsBinaryString(f);

                file.upload = Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    fields: {username: $scope.username},
                    file: file
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            };


            $scope.settingsForm.loadTRECCompositions = function () {
                $http.get("http://" + $scope.ipAddresse + ':8080/terrier/loadTRECCompositions'
                ).success(function (data, status) {
                        $scope.dataSetList = angular.fromJson(JSON.stringify(data));
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

            $scope.settingsForm.loadTRECFileList = function () {
                $http.get('http://' + $scope.ipAddresse + ':8080/terrier/loadTRECFileList'
                ).success(function (data, status) {
                        $scope.settingsForm.trecFilesJSON = data;
                        $scope.collections = data;
                        //if (data.length != 0) {
                        //    $scope.qrels = data[0].qrels;
                        //    $scope.topics = data[0].topics;
                        //    $scope.trecFiles = angular.fromJson(JSON.stringify($scope.settingsForm.trecFilesJSON));
                        //}
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

            saveTRECTestComposition = function () {
                var url = 'http://' + $scope.ipAddresse + ':8080/terrier/saveTRECTestComposition';
                var data = {};
                data.name = $scope.trecCompositionName;
                data.collection = $scope.selectedCollection;
                alert($scope.selectedCollection);
                data.qrels = $scope.selectedQrels;
                data.topics = $scope.selectedTopics;
                $http.post(url, JSON.stringify(data),
                    {'Content-Type': 'application/json'}
                ).success(function (data, status) {
                        $scope.loading = false;
                        jQuery("#dialogComp").dialog("close");
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });
            };


            $scope.settingsForm.saveDataSet = function () {
                var i = 0;
                // collection upload
                var trecUploadName = $("#commonConfigName").val();
                var collectionName = "collectSample";
                if (trecUploadName == "") {
                    return;
                }

                // prepare backend for upload
                prepareTerrierTRECUpload(trecUploadName, collectionName);

                if ($scope.colUploader.queue.length == 1) {
                    var item = $scope.colUploader.queue[i];
                    item.alias = "collection";
                    item.url = item.url + "?collectionName=" + collectionName + "&trecUploadName=" + trecUploadName;
                    item.upload();
                }

                // qrels uploader
                if ($scope.qrelsUploader.queue.length == 1) {
                    var item = $scope.qrelsUploader.queue[i];
                    item.alias = "collection";
                    item.url = item.url + "?collectionName=" + collectionName + "&trecUploadName=" + trecUploadName + "&isQrels=true";
                    item.upload();
                }

                // topics uploader
                for (i = 0; i < $scope.topicsUploader.queue.length; ++i) {
                    var item = $scope.topicsUploader.queue[i];
                    item.url = item.url + "?collectionName=" + collectionName + "&trecUploadName=" + trecUploadName + "&isQrels=false";
                    item.upload();
                }
            };

            /**
             * load selected file into the terrier editor
             */
            $scope.settingsForm.loadTerrierEditor = function () {

                if ($scope.terrierLoadFile) {
                    $http.get('http://' + $scope.ipAddresse + ':8080/terrier/loadFile?name=' + $scope.terrierLoadFile
                    ).success(function (data, status) {
                            $scope.settingsForm.terrierConfigContent = data;
                            //$scope.settingsForm.terrierConfigContent = data;
                            //$scope.terrierConfigResult = angular.fromJson(JSON.stringify($scope.settingsForm.terrierConfigContent));
                        }).error(function (data, status) {
                            console.log(status);
                        })
                }
                else {
                    alert('No file Selected to load into the editor.');
                }
            };

            $scope.settingsForm.changeDataListSet = function (dataSet) {
                var comp = {};
                comp.name = dataSet;
                var index = $scope.selectedDataSets.indexOf(dataSet);
                if (index == -1) {
                    $scope.selectedDataSets.push(comp);
                } else {
                    $scope.selectedDataSets.splice(index, 1);
                }
            };

            $scope.settingsForm.changeCollectionSet = function (dataSet) {
                $scope.selectedCollection = dataSet;
                updateQrelsAndTopics(dataSet);
            };


            $scope.settingsForm.changeQrelsSet = function (dataSet) {
                var qrel = {};
                qrel.name = dataSet;
                var index = $scope.selectedQrels.indexOf(dataSet);
                if (index == -1) {
                    $scope.selectedQrels.push(qrel);
                } else {
                    $scope.selectedQrels.splice(index, 1);
                }
            };

            function updateQrelsAndTopics(collectionName) {
                $scope.qrels = [];
                $scope.topcis = [];
                for (var i = 0; i < $scope.collections.length; ++i) {
                    var col = $scope.collections[i];
                    if (col.name == collectionName) {
                        $scope.qrels = col.qrels;
                        $scope.topics = col.topics;
                    }
                }
                $scope.selectedQrels = [];
                $scope.selectedTopics = [];
            }

            $scope.settingsForm.changeTopicsSet = function (dataSet) {
                var topic = {};
                topic.name = dataSet;
                var index = $scope.selectedTopics.indexOf(dataSet);
                if (index == -1) {
                    $scope.selectedTopics.push(topic);
                } else {
                    $scope.selectedTopics.splice(index, 1);
                }
            };


            $scope.settingsForm.changeConfigListSolr = function (configName) {
                var index = $scope.solrSelectedConfig.indexOf(configName);
                if (index == -1) {
                    $scope.solrSelectedConfig.push(configName);
                } else {
                    $scope.solrSelectedConfig.splice(index, 1);
                }
            };

            $scope.settingsForm.changeConfigListTerrier = function (configName) {
                var conf = {};
                conf.name = configName;
                conf.reindex = false;

                var index = $scope.settingsForm.getIndexOfItem(configName);
                if (index == -1) {
                    $scope.terrierSelectedConfig.push(conf);
                } else {
                    $scope.terrierSelectedConfig.splice(index, 1);
                }
            };

            $scope.settingsForm.getIndexOfItem = function (configName) {
                for (var i = 0; i < $scope.terrierSelectedConfig.length; ++i) {
                    if ($scope.terrierSelectedConfig[i].name === configName) {
                        return i;
                    }
                }
                return -1;
            };


            $scope.settingsForm.changeConfigListSolr = function (configName) {
                var conf = {};
                conf.name = configName;
                conf.reindex = false;

                var index = $scope.settingsForm.getIndexOfItem(configName);
                if (index == -1) {
                    $scope.terrierSelectedConfig.push(conf);
                } else {
                    $scope.terrierSelectedConfig.splice(index, 1);
                }
            };

            $scope.settingsForm.getIndexOfItem = function (configName) {
                for (var i = 0; i < $scope.terrierSelectedConfig.length; ++i) {
                    if ($scope.terrierSelectedConfig[i].name === configName) {
                        return i;
                    }
                }
                return -1;
            };


            $scope.settingsForm.changeConfigListIndexTerrier = function (configName) {
                var index = $scope.settingsForm.getIndexOfItem(configName);
                if (index == -1) {
                    $scope.settingsForm.changeConfigListTerrier(configName);
                    $scope.settingsForm.changeConfigListIndexTerrier(configName);
                } else {
                    if ($scope.terrierSelectedConfig[index].reindex === true) {
                        $scope.terrierSelectedConfig[index].reindex = false;
                    } else {
                        $scope.terrierSelectedConfig[index].reindex = true;
                    }
                }
            };

            $scope.settingsForm.getSearchEngineConfigs = function () {
                $scope.settingsForm.loadTRECCompositions();
                $scope.settingsForm.getTerrierElements();
            };

            $scope.settingsForm.getSolrElements = function () {
                $scope.settingsForm.loadSolrConfigs();
                $scope.settingsForm.getSolrConfig();
            };

            $scope.settingsForm.getTerrierElements = function () {
                $scope.settingsForm.loadTerrierConfigs();
                $scope.settingsForm.getTerrierConfig();
                loadCompositions();
            };

            $scope.settingsForm.loadSolrConfigs = function () {
                //configFiles
                $http({
                    method: 'JSONP',
                    url: 'http://' + $scope.ipAddresse + ':8984/solr/collection1/configFiles?callback=JSON_CALLBACK'
                }).success(function (data, status) {
                    $scope.settingsForm.solrConfigData = data;
                    $scope.settingsForm.solrConfigStatus = status;
                    $scope.solrConfigResult = angular.fromJson(JSON.stringify($scope.settingsForm.solrConfigData.configFiles));
                    $scope.solrSchemaResult = angular.fromJson(JSON.stringify($scope.settingsForm.solrConfigData.schemaFiles));
                    if ($scope.solrSchemaResult.length > 0) {
                        $scope.solrSelectedSchema = $scope.solrSchemaResult[0];
                    }


                }).error(function (data, status) {

                });
            };

            $scope.settingsForm.loadTerrierConfigs = function () {
                $http.get('http://' + $scope.ipAddresse + ':8080/terrier/configFiles'
                ).success(function (data, status) {
                        $scope.settingsForm.terrierConfigContent = data;
                        $scope.terrierConfigResult = angular.fromJson(JSON.stringify($scope.settingsForm.terrierConfigContent));
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

            $scope.settingsForm.runTest = function () {
                //runTestTerrier();
                runTestSolr();
            };

            $scope.settingsForm.saveCommonConfiguration = function () {
                $scope.data = {};

                $scope.data.fileName = $("#commonConfigName").val();
                $scope.data.description = $("#commonConfigDescription").val();
                $scope.data.stopWordsEnabled = $("#commonStopWordsEnabled").val() == "on";
                $scope.data.qeEnabled = $("#commonQueryExpansionEnabled").val()  == "on";
                $scope.data.weightingModel = $("#selectedWeightingModel > option[selected='selected']").text();
                $scope.data.k1 = $("#weightK1").val();
                $scope.data.b = $("#weightB").val();
                $scope.data.tokenizer = $("#commonTokenizer > option[selected='selected']").text();
                //todo check if this needed
                $scope.data.tokenizerLang = "eng"; //$("#commonTokenizerLang").val();
                $scope.data.normalizer = $("#selectedCommonNormalizer > option[selected='selected']").text();
                $scope.data.splitOnWhiteSpace = $("#commonSplitOnWhiteSpace").val()  == "on";
                $scope.data.queryOperator = $("#selectedCommonQueryOperator > option[selected='selected']").text();;
                $scope.data.stemmer = $("#selectedCommonStemmer > option[selected='selected']").text();
                $scope.data.stemmerLang = $("#selectedCommonStemmerLang").val();

                saveTerrierConfig();
                saveSolrConfig();
            };

            $scope.settingsForm.runTestCommon = function () {
                //runTestTerrier();
                //runTestSolr();
                $scope.loading = true;
                sleep(5000);
                $scope.loading = false;
                $('#testResults').removeClass("hidden");

            };

            prepareTerrierTRECUpload = function (trecUploadName, collectionName) {
                var url = 'http://' + $scope.ipAddresse +
                    ':8080/terrier/prepareTRECUpload?trecUploadName=' + trecUploadName + '&collectionName=' + collectionName;

                $http.post(url
                ).success(function (data, status) {

                }).error(function (data, status) {

                });
            };

            saveTerrierConfig = function () {
                $scope.loading = true;
                var url = 'http://' + $scope.ipAddresse + ':8080/terrier/saveConfig';

                $http.post(url, {
                        data: $scope.data
                    },
                    {'Content-Type': 'application/json'}
                ).success(function (data, status) {
                        $scope.loading = false;
                        $('#terrierResult').html(data.replace(/\"/g, ""));
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });
            };

            function saveSolrConfig() {
                var url = 'http://' + $scope.ipAddresse + ':8984/solr/collection1/saveConfig';
                $http.post(url,
                    $scope.data,
                    {'Content-Type': 'applilcation/json'}
                )
                    .success(function (data, status) {
                        alert('bla1');
                    })
                    .error(function (data, status) {
                        alert('bla2');
                    }
                );
            }

            function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }


            $scope.load = function () {
                $http.get('test.json')
                    .success(function (data) {

                    }).error(function (data, status) {

                    });
            };
            // end spinner definition

            loadCompositions = function () {
                loadTerrierCompositions();
                loadSolrCompositions();
            };

            loadTerrierCompositions = function () {
                $http.get('http://' + $scope.ipAddresse + ':8080/terrier/configFiles'
                ).success(function (data, status) {
                        var results = angular.fromJson(JSON.stringify(data));
                        $scope.terrierTestConfigurations = results.testConfigurations;
                        $scope.collectionInfo = results.collectionInformation;
                        $scope.terrierConfigurations = results.terrierConfigurations;
                        $scope.settingsForm.terrierConfigContent = data;
                    }).error(function (data, status) {
                        console.log(status);
                    });
            };

            loadSolrCompositions = function () {
                $scope.loadingStage = 'Running Solr tests...';
                $scope.loading = true;
                var url = 'http://' + $scope.ipAddresse + ':8983/solr/collection1/loadCompositions';
                $http.post(url,
                    {schemaFile: $scope.solrSelectedSchema, configFiles: $scope.solrSelectedConfig},
                    {'Content-Type': 'text/xml'}
                ).success(function (data, status) {
                        var results = angular.fromJson(JSON.stringify(data));
                        $scope.solrTestConfigurations = results.testConfigurations;
                        $scope.solrConfigurations = results.solrConfigurations;
                        $scope.loading = false;
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });
            };

            //{"solrTestConfiguration":[{"name":"extended configuration","selected":false},{"name":"standard configuration","selected":false},{"name":"standard configuration 2","selected":false}],"solrConfigurations":[{"name":"extended configuration","reindex":true,"selected":false,"isSelected":true},{"name":"standard configuration","reindex":false,"selected":false,"isSelected":true},{"name":"standard configuration 2","reindex":false,"selected":false}]}
            runTestSolr = function () {
                $scope.loadingStage = 'Running Solr tests...';
                $scope.loading = true;
                var url = 'http://' + $scope.ipAddresse + ':8983/solr/collection1/runTest';
                $http.post(url,
                    {testConfigurations: $scope.solrTestConfigurations, solrConfigurations: $scope.solrConfigurations},
                    {'Content-Type': 'text/xml'}
                ).success(function (data, status) {
                        $scope.loading = false;
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });
            };

            //runTestSolr = function () {
            //    $scope.loadingStage = 'Running Solr tests...';
            //    $scope.loading = true;
            //    var url = 'http://' + $scope.ipAddresse + ':8983/solr/collection1/load';
            //    $http.post(url,
            //        {schemaFile: $scope.solrSelectedSchema, configFiles: $scope.solrSelectedConfig},
            //        {'Content-Type': 'text/xml'}
            //    ).success(function (data, status) {
            //        $scope.loading = false;
            //    }).error(function (data, status) {
            //        $scope.loading = false;
            //    });
            //};

            runTestTerrier = function () {
                $scope.loadingStage = 'Running Terrier tests...';
                $scope.loading = true;
                var url = 'http://' + $scope.ipAddresse + ':8080/terrier/runTest';

                var data = {};
                data.configurations = $scope.terrierSelectedConfig;
                data.compositions = $scope.selectedDataSets;

                $http.post(url, {
                        testConfigurations: $scope.terrierTestConfigurations,
                        terrierConfigurations: $scope.terrierConfigurations
                    },
                    {'Content-Type': 'application/json'}
                ).success(function (data, status) {
                        $scope.loading = false;
                        $('#terrierResult').html(data.replace(/\"/g, ""));
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });
            };


            $scope.settingsForm.getSolrConfig = function () {
                $http({
                    method: 'JSONP',
                    url: 'http://' + $scope.ipAddresse + ':8984/solr/collection1/readSettings?callback=JSON_CALLBACK'
                }).success(function (data, status) {
                    //alert($scope.editorContent);
//                alert($scope.code);
                    $scope.settingsForm.data = data;
                    $scope.settingsForm.status = status;
                    $scope.settingsForm.result = angular.fromJson(JSON.stringify($scope.settingsForm.data));
                    var searchHandlersDTO = $scope.settingsForm.result.searchHandlersDTO;
                    var updateHandlerDTO = $scope.settingsForm.result.updateHandlerDTO;

                    for (var i = 0; i < searchHandlersDTO.length; i++) {
                        var searchHandlerDTO = searchHandlersDTO[i];
                        var searchHandlerName = searchHandlerDTO.searchHandlerName;
                        $scope.settingsForm.searchHandlerName = searchHandlerDTO.searchHandlerName;
                        $scope.settingsForm.searchComponents = searchHandlersDTO[0].searchComponents;
                        $scope.settingsForm.defaultComponents = searchHandlerDTO.defaultComponents;
//                    $scope.firstComponents = $scope.result[i].firstComponents;
//                    $scope.lastComponents = $scope.result[i].lastComponents;

                        if (jQuery.inArray(searchHandlerName, searchHandlerNames) == -1) {
                            searchHandlerNames[i] = searchHandlerName;
                        }

                    }
                    $scope.settingsForm.searchHandlerNames = searchHandlerNames;


                    //update handler
                    $scope.settingsForm.autoCommitMaxDocs = updateHandlerDTO.autoCommitMaxDocs;
                    $scope.settingsForm.autoCommitMaxTime = updateHandlerDTO.autoCommitMaxTime;
                    $scope.settingsForm.autoSoftCommitMaxDocs = updateHandlerDTO.autoSoftCommitMaxDocs;
                    $scope.settingsForm.autoSoftCommitMaxTime = updateHandlerDTO.autoSoftCommitMaxTime;
                    $scope.settingsForm.openSearcher = updateHandlerDTO.openSearcher;
                    $scope.settingsForm.updateClassName = updateHandlerDTO.className;
                    $scope.settingsForm.commitIntervalLowerBound = updateHandlerDTO.commitIntervalLowerBound;
                    $scope.commitWithinSoftCommit = updateHandlerDTO.commitWithinSoftCommit;
                    $scope.settingsForm.indexWriterCloseWaitsForMerges = updateHandlerDTO.indexWriterCloseWaitsForMerges;

                    //alert($scope.result.solrConfigContent);
                    $scope.settingsForm.solrConfigContent = $scope.settingsForm.result.solrConfigContent;

                }).error(function (data, status) {
                    $scope.settingsForm.data = data || 'request failed';
                    $scope.settingsForm.status = status;
                    $scope.settingsForm.products = JSON.stringify($scope.settingsForm.data);
                    console.log($scope.settingsForm.status);
                });
            };


            /**
             * saves solrConfig.xml changes in the running solr application.
             */
            $scope.settingsForm.saveSolrChanges = function () {
                var url = 'http://' + $scope.ipAddresse + ':8984/solr/collection1/updatePath';
                alert($scope.settingsForm.solrConfigContent);
                $http.post(url,
                    $scope.settingsForm.solrConfigContent,
                    {'Content-Type': 'text/xml'}
                )
                    .success(function (data, status) {
                        alert('bla1');
                    })
                    .error(function (data, status) {
                        alert('bla2');
                    }
                );
            };


            $scope.settingsForm.saveNewConfigFile = function () {
                //jQuery("#dialog").dialog("open");
                alert(jQuery("#dialog").attr('class'));
            };

            saveNewTerrierConfigFile = function () {
                //jQuery("#dialog").dialog("open");
                //alert(jQuery("#dialog").attr('class'));

                var url = 'http://' + $scope.ipAddresse + ':8080/terrier/saveTestCollection';
                var data = {};
                data.name = $('#name').val();
                data.description = $('#description').val();
                data.fileContent = $scope.settingsForm.terrierConfigContent;
                $http.post(url, JSON.stringify(data),
                    {'Content-Type': 'application/json'}
                ).success(function (data, status) {
                        $scope.loading = false;
                        jQuery("#dialog").dialog("close");
                    }).error(function (data, status) {
                        $scope.loading = false;
                    });

            };

            $scope.searchForm.searchAll = function () {
                $scope.selectedPage = $scope.resultPage;

                $scope.searchForm.searchTerrier();
                $scope.searchForm.searchSolr();
            };

            $scope.searchForm.searchTerrier = function () {
                $http.get('http://' + $scope.ipAddresse + ':8080/terrier/search?term=' + $scope.searchForm.searchTerm
                ).success(function (data, status) {
                        $scope.searchForm.terrierResults = angular.fromJson(JSON.stringify(data));
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

            $scope.searchForm.searchSolr = function () {
                $http.get(
                    'http://' + $scope.ipAddresse + ':8984/solr/collection1/select?q=*' + $scope.searchForm.searchTerm + '*&wt=json&indent=true&facet=true&spellcheck=true'
                ).success(function (data, status) {
                        $scope.searchForm.solrResults = angular.fromJson(JSON.stringify(data));
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

            $scope.settingsForm.getTerrierConfig = function () {
                $http.get('http://' + $scope.ipAddresse + ':8080/terrier/loadConfig'
                ).success(function (data, status) {
                        $scope.settingsForm.terrierConfigContent = data;
                    }).error(function (data, status) {
                        console.log(status);
                    })
            };

//        this.searchSubmit = function() {
//            var store = this;
//            this.products = [];
////            alert('bla');
//            $http({method: 'JSONP',
//                   url: 'http://localhost:8984/solr/collection1/select?q=samsung&wt=json&indent=true',
//                   params:{
//                        'json.wrf': 'JSON_CALLBACK',
//                        'q': 'samsung',
//                        'fl': $scope.displayField
//                   }
//                }).success(function(data, status) {
//                    $scope.data = data;
//                    $scope.status = status;
//
//                    $scope.products = JSON.stringify($scope.data);
//
//                }).error(function(data, status) {
//                    $scope.data = data || 'request failed';
//                    $scope.status = status;
//                    alert($scope.data);
//            });
//        };

        }
    ])
    ;

    var searchHandlerNames = [];
})();