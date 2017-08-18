// window.$getJsonSearch = { "sadf" : "asdfsf"} ;

(function( $ )
{
	
	/*Object.defineProperties(
		Object.prototype ,
		{
			fnNum_thisIdx : {
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : function ( htmlcol ) 
				{
					for ( var i = 0 ; i < htmlcol.length ; i++ ) 
					{
						if ( this == htmlcol[ i ] )
						{
							return i ;
						} ;
					} ;
				} ,
			} ,
		}
	) ;*/

	// window.$getJsonSearch = { "sadf" : "asdfsf"} ;
	var getDomStrTemp = function ( jsonData , key )
	{
		var json = jsonData[ key ] ;
		var searchStr = location.search ;
		window.json = json ;

		/*$( document ).on(
			"pageInit" ,
			function ( e , pageId , $page ) 
			{
				if ( pageId == "detail-page" )
				{
					console.log( "pageId:" , pageId ) ;
					// window.json = json ;
					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
					// console.log( "window.json:" , window.json ) ;
				} ;
			} 
		) ;*/
		
		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		var domStrTemp = 
				   '<li>'
                  +'    <div class="item-content list-item">'
                  +'        <div class="p">'
                  +'             <a href=" ' + 'examples/light7-mall_c01/detail/' + searchStr + "&key=" + key + ' " title="">'
                  +'                <img class="p-pic" src=" ' + json.link + ' " style="visibility: visible;">'
                  +'                <span class="flag c-icon-pt"></span>'
                  +'              </a>'
                  +'        </div>'
                  +'        <div class="d">'
                  +'            <a href="examples/light7-mall_c01/home/goods-detail.html" title="">'
                  +'                <h3 class="d-title">  ' + json.title + ' </h3>'
                  +'            </a>'
                  +'            <p class="d-price">'
                  +'                <em class="h">'
                  +'                    <span class="price-icon">¥</span>'
                  +'                    <span class="font-num"> ' + json.price_integer + ' </span>'
                  +'                </em>'
                  +'                <del></del>'
                  +'            </p>'
                  +'            <div class="d-main">'
                  +'                <p class="d-freight"> ' + postage + ' </p>'
                  +'                <p class="d-num">'
                  +'				   <span class="font-num"> ' + json.sales + ' </span>人付款'
                  +'				</p>'
                  +'                <p class="d-area"> ' + json.delivery + ' </p>'
                  +'            </div>'
                  +'        </div>'
                  +'    </div>'
                  +'    <div class="icons-group"></div>'
                  +'</li>' ;
      	return domStrTemp ;

	} ;
	var appendSearchList = function ( data , callback , startIdx , length , anchorDom ) 
	{
		var subData = data.splice( startIdx , length ) ;
		var arys_buffer = [] ;
		anchorDom = anchorDom ? anchorDom : document.querySelector( ".list-container.page-container" ) ;
		
		
		for ( var key1 in subData )
		{
			var domStrTemp = callback( subData , key1 ) ;
			arys_buffer.push( domStrTemp ) ;
		} ;
		// console.log( "arys_buffer:" , arys_buffer ) ;
// 		var str_bufferRes = arys_buffer.splice( startIdx , length ) ;
		anchorDom.append( arys_buffer.join( "" ) ) ;
		return data ;
	} ;

	var pgInfi = function ( json , subStrBuf )
	  {
	    	console.log( "pgInfiJson:" , json ) ;
	    	var loading = false ;
            var flipTimes = 0 ;
            var stepLength = 3 ;
            $( "#page-infinite-scroll" )
            .on( 
                  'infinite' , 
                  function ( e ) 
                  {
                  		console.log( "e:" , e ) ;
                      if (loading) return ;

                      loading = true ;
                      // flipTimes++ ;
                      setTimeout( 
                          function () 
                          {
                              loading = false ;

                              // addItems() ;
                              appendSearchList( json , getDomStrTemp , 0  , stepLength , $( ".list-container.page-container" ) ) ;
                          } , 
                          1000 
                      ) ;
                  }
            ) ;
	      /*$( document )
	      .on( 
	            "pageInit" , "#page-infinite-scroll" , 
	            function( e , id , page  ) 
	            {
	                console.log( "e:" , e ) ;
	                console.log( "pgInfiJson:" , json ) ;
	                function addItems( number , lastIndex ) 
	                {
	                    var html = '' ;
	                    for ( var i = 0 ; i < 20 ; i++ ) 
	                    {
	                        html += 
	                        ( 
	                          '<li class="item-content">'
	                              + '<div class="item-inner">'
	                              + json[0].id
	                              + '<div class="item-title">Item</div>'
	                              + '</div>'
	                              + '</li>' 
	                        ) ;
	                    } ;
	                    $( '.infinite-scroll .list-container' ).append( html ) ;
	                } ;
	                
	            }   
	      ) ;*/
	      // $.init();
	  } ;
	  // pgInfi();

	var getAjaxLock = false ;  
	function fn_getAjax( jsonName , idx , flag )
	{
// 		if ( getAjaxLock ) return ;
		fn_getAjax = true ;
		if ( jsonName.constructor.name == "Array" )
		{
			var url = document.baseURI + "json/" + jsonName[ idx ] + ".json" ;
		}
		else if ( jsonName.constructor.name == "Object" )
		{
			var url = "http://www.spitc-cn.com/mall_a01" + jsonName[ idx ] ;

		} ; 
		$.ajax(
			{

				// url : "http://localhost:8081/mall_a01/overcoat?" ,
				url : url ,
				crossDomain : true ,
				type : "get" ,
				dataType : "jsonp" ,
				mimeType : "text/javascript" ,
				scriptCharSet : "utf-8" ,
				jsonp : "jsonp" ,
				jsonpCallback : "mSearchjsonp" + ( ( idx == 0 ? 1 : idx ) + 1 ) ,
				success : function ( data )
				{
					// $.init() ;
					console.log( "data" , data ) ;
					window.data = data ;
					// var result = data.data.result[ 0 ] ;
					var result = data.result ;

					// var moduleList = data.data.result[ 0 ].moduleList ;
					// appendTb1( result , $( ".inj-anc" ) , flag ) ;
					var subData = appendSearchList( result , getDomStrTemp , 0 , 6 , $( ".list-container.page-container" ) ) ;	
					pgInfi( subData );
					
				} ,
				error : function ( XMLHttpRequest, textStatus, errorThrown )
				{
					console.log( "XMLHttpRequest:" , XMLHttpRequest ) ;
					console.log( "textStatus:" , textStatus ) ;
					console.log( "errorThrown:" , errorThrown ) ;
				} ,
			}
		) ;
	} ;
	// fn_getAjax( navMap , 0 , true ) ;
	// console.log( "window.data:" , window.data ) ;
	$( document ).on(
		"pageInit" ,
		function ( e , pageId , $page )
		{
			console.log( "e:" , e ) ;
			if 
			( pageId == "detail-page" 
				// && !getAjaxLock 
			)
			{
				// console.log( "pageId:" , pageId ) ;
				// var pgp_docSerh = String.prototype.fnPgp_getDocSerh() ;
				// console.log( "pgp_docSerh:" , pgp_docSerh );
				// fn_getAjax( pgp_docSerh , Object.keys( pgp_docSerh )[ 0 ] , true ) ;
			} ;
		} 
	) ;


	window.$detailGetJson = 
	{
		// fn_getAjax : fn_getAjax ,
	} ;

	// $.init() ;
	// location.reload() ;
})( $ ) ;
console.log( "getJson-detail.js" ) 
	$.init() ;