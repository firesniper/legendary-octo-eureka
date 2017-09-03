+function (  )
{
    var ngGetJson = function ( params )
    {
        var pgp_docSerh = params && params.pgp_docSerh ? 
                          params.pgp_docSerh :
                        { scm : "malldata" , tbNamesStr : "shoe,overcoat" } ;
        var str_getDataModeFlag = params.str_getDataModeFlag ;
        var mdu_root            = params.mdu_root ;
        pgp_docSerh.fn_bootDocSerhExtendEnvState (  ) ;

        console.log ( "angular:" , angular ) ;
        // var mdu_root = angular.module ( "mdu_root" , [ "infinite-scroll" ] ) ;
        mdu_root.value('THROTTLE_MILLISECONDS', 250) ;
        console.log ( "mdu_root:" , mdu_root ) ;

        mdu_root.filter
        (
            "fnStr_comboAnchUrl" ,
            $tMallNgCompo.fnStr_comboAnchUrl
        ) ;
        mdu_root.filter
        (
            "fil_cvtPostage" ,
            function ( ) 
            {
                return $tMallNgCompo.fnStr_cvtPostage ()  ;
            }
        ) ;
        mdu_root.provider
        (
            "pvd_http" ,
            function ()
            {
                this.$get = function ()
                {
                    return {
                        fn_getAjax  : $tMallNgCompo.fn_getAjax 
                        , fnCstru_getReddit      : $tMallNgCompo.fnCstru_getReddit 
                    }
                } ;
            }
        ) ;
        mdu_root.factory
        (
            'Reddit' , 
            function  ( $http ) 
            {
                var Reddit = function () 
                {
                    this.items = [];
                    this.busy = false;
                    this.after = '';
                } ;

                Reddit.prototype.nextPage = function () 
                {
                    if ( this.busy ) return ;
                    this.busy = true ;

                    var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK" ;
                    $http.jsonp ( url )
                    .success
                    (
                        function ( data ) 
                        {
                            var items = data.data.children ;
                            for ( var i = 0 ; i < items.length ; i ++ ) 
                            {
                                this.items.push ( items [ i ].data ) ;
                            } ;
                            this.after = "t3_" + this.items [ this.items.length - 1 ].id ;
                            this.busy = false ;
                        }
                        .bind ( this ) 
                    ) ;
                } ;

                return Reddit;
            }
        ) ;
        mdu_root.controller
        (
            "ctr-root" ,
            function ( $scope , $http  , pvd_http /*, Reddit*/ )
            {
                // console.log ( "pvd_http:" , pvd_http ) ;
                
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

                $tMallNgCompo.ctr_root 
                ( 
                    { 
                        $scope      : $scope , 
                        $http       : $http ,
                        pvd_http    : pvd_http ,
                        str_getDataModeFlag    : str_getDataModeFlag 
                    }   
                ) ;

                // $scope.reddit = new Reddit () ;
                /*$scope.images = [1];

                $scope.loadMore = function() {
                    var last = $scope.images[$scope.images.length - 1];
                    for(var i = 1; i <= 5; i++) {
                    $scope.images.push(last + i);
                    }
                } ;
                $scope.red = function () {
                    console.log ( "red:" ) ;
                } ;*/
            }
        ) ; 
        /*angular.element ( document ).ready  
        (
            function ( $ )
            {
                angular.bootstrap ( document , [ "mdu_root" ] ) ;

            }
        ) ;*/
    } ;

    /*var ngSection = 
    {
        ngGetJson   : ngGetJson
    } ;*/
    if ( !window.$ngSection )
    {
        window.$ngSection = {} ;
    } ;
    Object.defineProperties
    (
        window.$ngSection ,
        {
            "ngGetJson" :
            {
                enumerable : false ,
                configurable : true ,
                writable : true ,
                value : ngGetJson 
            }
        }
    ) ;
    
} (  ) ;
// $ngSection.ngGetJson () ;