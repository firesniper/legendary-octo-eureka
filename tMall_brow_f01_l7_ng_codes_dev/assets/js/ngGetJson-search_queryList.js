+function (  )
{
    var mdu_root = angular.module ( "mdu_root" , [ "infinite-scroll" ] ) ;

    mdu_root.directive
    (
        "direcJsearch" ,
        function (  )
        {
            return {
                restrict : "EA" ,
                scope : false ,
                link : function ( $scope , $elem , $attr )
                {
                    /*var sechIpt = document.querySelector
                    ( 
                        "form#J_Search input[name=dicStr]" 
                    ) ;*/
                    console.log ( "$elem:" , $elem ) ;
                    /*var clsBtn = document.querySelector( "form#J_Search button" ) ;

                    clsBtn.addEventListener(
                        "touchstart" ,
                        function ( e )
                        {
                            e.preventDefault() ;
                            // console.log( "e:" , e ) ;
                            e.stopPropagation() ;
                            e.cancelBubble = true ; 

                            sechIpt.value = "" ;
                            this.style = "display: none ;"
                        } ,
                        true

                    ) ;*/

                }
            }

        }
    ) ;

    mdu_root.directive  
    (
        "direcList" ,
        function (  )
        {
            return {
                restrict : "EA" ,
                scope : false ,
                link : function ( $scope , $elem , $attr )
                {
                    /*var sechIpt = document.querySelector
                    ( 
                        "form#J_Search input[name=dicStr]" 
                    ) ;*/
                    console.log ( "$elem:" , $elem ) ;
                    var closeDropListHandle = function ( e ) 
                    {
                        // dropList.className += " droplist-expand" ;
                        // console.log( "$(dropList):" , $(dropList) ) ;
                        var clsFlag = $( dropList ).hasClass( "droplist-expand" ) ;
                        if ( clsFlag )
                        {
                            $( dropList ).removeClass( "droplist-expand" ) ;
                        }
                        else
                        {
                            dropList.className += " droplist-expand" ;
                        } ;
                    }
                    var droplistTrigger = document.querySelector( ".droplist-trigger" ) ;
                    var dropList = document.querySelector( ".droplist" ) ;
                    droplistTrigger.addEventListener(
                        "touchstart" ,
                        function ( e ) 
                        {
                            closeDropListHandle( e ) ;
                        }
                    ) ;


                    var sort = $( ".droplist .sorts .sort" ) ;
                    sort.on
                    (
                        "touchstart" ,
                        function ( e )
                        {
                            var clsFlag = $( this ).hasClass( "selected" ) ;
                            if ( !clsFlag )
                            {

                                sort.removeClass( "selected" ) ;
                                this.className += " selected" ;

                            } ;

                            var dataValue = this.getAttribute( "data-value" ) ;
                            
                            var jary_queque = 
                            // $scope.reddit.items
                            $scope.reddit.items
                            // .fnJary_queueJary 
                            .fnJary_sortJaByType
                            ( 
                                
                                Object.pgp_jaToSortTypeMap 
                                [ 
                                    dataValue
                                    // "_bid" 
                                ] 
                            ) ;

                            $scope.reddit.items = jary_queque ;
                            console.log ( "$scope.jary_data:" , $scope ) ;
                            $scope.$apply ( "" )  ;
                            closeDropListHandle( e ) ;
                            // switch ( dataValue )
                            // {
                            // 	case "" :

                            // } ;
                        } 
                    ) ;

                }
            }

        }
    ) ;

    $ngSection.ngGetJson 
    (
        {
            pgp_docSerh     : 
            String.prototype.fnPgp_getDocSerh () ,
            str_getDataModeFlag : 1 ,
            mdu_root            : mdu_root

        }
        
    ) ;
    
    angular.element ( document ).ready  
    (
        function ( $ )
        {
            angular.bootstrap ( document , [ "mdu_root" ] ) ;

        }
    ) ;

} (  ) ;
