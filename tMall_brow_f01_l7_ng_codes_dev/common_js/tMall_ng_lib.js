+function ()
{
    var fnCstru_getReddit = function ( /*$http*/ params ) 
    {
        var $http                       = params.$http ;
        var str_emerUrl_ngJsonp         = params.str_emerUrl_ngJsonp ;
        var str_servWholeUri_ngJsonp    = params.str_servWholeUri_ngJsonp ;
                  
        var fn_ajaxSucc = function ( params )
            {
                var json_data   = params.json_data ;
                // var _this       = params._this ;
                var jary_conData = json_data.fnJary_concatJa () ;
                jary_conData.fnPgp_setIndex () ;
                var jary_reduceData = jary_conData ;
                var ary_selectSubData = jary_reduceData.splice 
                    (
                            0 , 
                            jary_reduceData.length - 1 
                        //  num_deadLineInc 
                    ) ;
                this.items = this.items.concat ( ary_selectSubData ) ;
                /*for ( var i = 0 ; i < items.length ; i ++ ) 
                {
                    this.items.push ( items [ i ] ) ;
                } ;*/
                this.after = "t3_" + this.items [ this.items.length - 1 ].id ;
                this.busy = false ;
            } ;
        var Reddit = function () 
        {
            this.items = [] ;
            this.busy = false ;
            this.after = '' ;
            // this.reqInc = 0 ;
            this.str_emerUrl_ngJsonp = str_emerUrl_ngJsonp ;
            this.str_servWholeUri_ngJsonp    = str_servWholeUri_ngJsonp ;
            // this.bol_isEmer = false ;
            this.fn_ajaxSucc = fn_ajaxSucc ;
        } ;

        Reddit.prototype.nextPage = function ( params ) 
        {
            var params = params ? params : 
            {
                reqInc  : 0 ,
                bol_isEmer : false ,

            } ;
            var reqInc              = !params || !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ;
            if ( reqInc > 0 ) return ;
            var bol_isEmer = params.bol_isEmer ? params.bol_isEmer : false ;
            var str_servUri = bol_isEmer ? this.str_emerUrl_ngJsonp : this.str_servWholeUri_ngJsonp ;
            var _this = this ;
            if ( this.busy ) return ;
            this.busy = true ;

            /*var str_servUri = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";*/
            
            $http
            .jsonp ( str_servUri ) 
            .success 
            ( 
                function ( json_data ) 
                {
                    if ( Object.bol_isNullJson ( json_data ) ) 
                    {
                        console.log ( "str_emerUrl:" , str_emerUrl ) ;
                        params.bol_isEmer = true ;
                        params.reqInc ++ ;
                        Reddit.prototype.nextPage ( params ) ;
                    } ;
                    fn_ajaxSucc.call ( this , { json_data : json_data } ) ;
                }
                .bind ( this ) 
            )
            .error
            (
                function ()
                {
                    $http.jsonp
                    (
                        str_emerUrl_ngJsonp 
                    )
                    .success 
                    (
                        function ( json_data )
                        {
                            fn_ajaxSucc.call ( this , { json_data : json_data } ) ;

                        }
                        .bind ( this )
                    )
                    .error
                    (
                        function ()
                        {
                            params.bol_isEmer = true ;
                            params.reqInc ++ ;
                            Reddit.prototype.nextPage ( params ) ;
                        }
                    ) ;
                }.bind ( this )
            ) ;
        } ;

        return Reddit ;
    } ;
    var fn_getAjax = function ( params )
    {
        /*params.reqInc = !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ; */
        var $http               = params.$http ;
        var $scope              = params.$scope ;
        var bol_isEmer          = params && params.bol_isEmer ? params.bol_isEmer : false ;
        var reqInc              = !params || !params.reqInc || isNaN ( params.reqInc ) ? 0 : params.reqInc ;
        if ( reqInc > 0 ) return ;

        /*var pgp_docSerh         = window.pgp_envState.pgp_envOpt.pgp_docSerh ;
        var str_emerUrl         = pgp_docSerh.fnStr_getServEmerUrl 
        (
            {
                str_emerDir : "/emerData_ng/" 
            }
        ) ;
        var str_servWholeUri    = pgp_docSerh.fnStr_getServWholeUri () ;*/

        var str_servWholeUri_ngJsonp    = params.str_servWholeUri_ngJsonp
        var str_emerUrl_ngJsonp         = params.str_emerUrl_ngJsonp ;

        var str_servUri = bol_isEmer ? str_emerUrl_ngJsonp : str_servWholeUri_ngJsonp ;
        var fn_ajaxSucc = function ( params )
        {
                var json_data   = params.json_data ;
                var $scope      = params.$scope ;
                console.log ( "json_data:" , json_data ) ;
                var jary_conData = json_data.fnJary_concatJa () ;
                jary_conData.fnPgp_setIndex () ;
                $scope.jary_data = jary_conData ;
                /*var postage = ( postage = jpgp_data.postage ) == 0 ? "免运费" : postage ;
                $scope.postage = postage ;*/
                console.log ( "$scope:" , $scope ) ;
        } ;
        /*var fn_newAjax = function ( params )
        {
            if ( params.bol_isEmer ) 
            {
                $http.jsonp ( str_emerUrl )
                .success
                (
                    function ( json_data , status , header , config ) 
                    {
                        fn_ajaxSucc ( json_data ) ;
                    } 
                ) ;
            } ;
        } ;*/
        $http.jsonp
        ( 
            // str_servWholeUri + '&jsonp=JSON_CALLBACK' 
            str_servUri
        )
        .success
        (
            function ( json_data )
            {
                // params.bol_isEmer = true ;
                if ( Object.bol_isNullJson ( json_data ) ) 
                {
                    console.log ( "str_emerUrl:" , str_emerUrl ) ;
                    params.bol_isEmer = true ;
                    params.reqInc ++ ;
                    fn_getAjax ( params ) ;
                } ;
                fn_ajaxSucc 
                ( 
                    { 
                        json_data : json_data ,
                        $scope    : params.$scope 
                    }
                ) ;
            }
        )
        .error
        (
            function ( err )
            {

                console.log ( "err params:" , params ) ;
                $http.jsonp
                ( 
                    str_emerUrl_ngJsonp 
                    // str_servUri
                )
                .success
                (
                    function ( json_data )
                    {
                        fn_ajaxSucc 
                        ( 
                            { 
                                json_data : json_data ,
                                $scope    : params.$scope 
                            }
                        ) ;
                    }
                )
                .error
                (
                    function ( err )
                    {
                        console.log ( "err:" , err ) ;
                        params.bol_isEmer = true ;
                        params.reqInc ++ ;
                        fn_getAjax ( params ) ;
                        // fn_newAjax ( { bol_isEmer : true } ) ;
                    }
                ) ;

            }
        ) ;
        

    } ;

    var fnStr_comboAnchUrl = function ( ) 
    {
        return function ( params )
        {
            console.log ( "fnStr_comboAnchUrl" ) ;
            return arguments.callee ;
        } ;
    } ;
    var fnStr_cvtPostage = function ( ) 
    {
        return function ( postage )
        {
            // console.log ( "fnStr_cvtPostage" ) ;
            var postage = ( postage == 0 ) ? "免运费" : postage ;
            return postage ;
        } ;
    }
    

    var ctr_root =  function ( params /*, fnStr_comboAnchUrl*/ )
    {
        var $scope      = params.$scope ;
        var $http       = params.$http ;
        var pvd_http    = params.pvd_http ;
        var str_getDataModeFlag    = params.str_getDataModeFlag ;

        console.log ( "pvd_http:" , pvd_http ) ;
        $scope.str_baseUri = document.baseURI ;
        $scope.str_docSerh = window.pgp_envState.pgp_envOpt.str_docSerh ;
        $scope.str_search = window.location.search ;

        /*var fnStr_getServEmerUrl = function ( params )
        {
            var str_emerDir    =   params && params.str_emerDir ? 
                                    params.str_emerDir : 
                                    pgp_envState.str_emerDir ;
            var str_tb = pgp_docSerh [ "tbNamesStr" ].split ( "," ) ;
            var str_emerUrl = pgp_envState.str_baseUrl + str_emerDir + "/" + str_tb [ 0 ] + ".js" ;
            return str_emerUrl ; 
        } ;*/
        var pgp_docSerh         = window.pgp_envState.pgp_envOpt.pgp_docSerh ;
        var str_emerUrl         = pgp_docSerh.fnStr_getServEmerUrl 
        (
            {
                str_emerDir : "/emerData_ng/" 
            }
        ) ;
        var str_servWholeUri    = pgp_docSerh.fnStr_getServWholeUri () ;

        var str_servWholeUri_ngJsonp = str_servWholeUri 
                                        + ( str_servWholeUri.indexOf ( "?" ) > 0 ? 
                                        '&' : 
                                        '?' ) 
                                        + "jsonp=JSON_CALLBACK" ;
        var str_emerUrl_ngJsonp = str_emerUrl 
                                        + ( str_emerUrl.indexOf ( "?" ) > 0 ? 
                                        '&' : 
                                        '?' )
                                        + "jsonp=JSON_CALLBACK" ;
        switch ( str_getDataModeFlag )
        {
            case 0 :
                pvd_http.fn_getAjax 
                ( 
                    {
                        $scope                      : $scope ,
                        $http                       : $http ,
                        str_servWholeUri_ngJsonp    : str_servWholeUri_ngJsonp ,
                        str_emerUrl_ngJsonp         : str_emerUrl_ngJsonp
                        // pgp_docSerh         : pgp_docSerh ,
                        // fnStr_comboAnchUrl  : fnStr_comboAnchUrl
                        // bol_isEmer  : false 
                    } 
                ) ;
            break ;
            case 1 :
                var cstru_Reddit = pvd_http.fnCstru_getReddit
                (
                    {
                        $http                       : $http ,
                        str_servWholeUri_ngJsonp    : str_servWholeUri_ngJsonp ,
                        str_emerUrl_ngJsonp         : str_emerUrl_ngJsonp
                    }
                ) ;
                $scope.reddit = new cstru_Reddit () ;

            break ;
        }
        
        
    } ;
    
    var tMallNgCompo = 
    {
        fn_getAjax          : fn_getAjax ,
        fnStr_comboAnchUrl  : fnStr_comboAnchUrl ,
        fnStr_cvtPostage    : fnStr_cvtPostage ,
        ctr_root            : ctr_root ,
        fnCstru_getReddit      : fnCstru_getReddit
    } ;

    Object.defineProperties
    (
        window ,
        {
            "$tMallNgCompo" :
            {
                enumerable : false ,
                configurable : false ,
                writable : true ,
                value : tMallNgCompo
            }
        }

    ) ;
} () ;