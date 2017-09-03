+function (  )
{

    var mdu_root = angular.module ( "mdu_root" , [ "infinite-scroll" ] ) ;
    
    $ngSection.ngGetJson 
    (
        {
            pgp_docSerh     : 
            { 
                scm : "malldata" , 
                tbNamesStr : "shoe,overcoat" 
            } ,
            str_getDataModeFlag : 0 ,
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
