// window.$searchGetJson = { "sadf" : "asdfsf"} ;

(function( $ )
{
	"use strict" ;
	
	
	Object.defineProperties(
		Array.prototype ,
		{
			JaSortByType : {
				enumerable : false ,
				configurable : true , 
				writable : true ,
				value : function ( field , reverse , array ) 
				{
					console.log( "this:" , this ) ;
					var args = Array.prototype.slice.call( arguments ) ;
					array = ( args.length == 3 && array ) ? 
							args[ args.length - 1 ] :
							function( $this )
							{
								if 
								( 
									$this.constructor.name == "Array"
									|| "length" in $this  
								)
								{
									return $this ;
								}
								else 
								{ 
									// throw new TypeError( "args must be Type String" ) ;
									console.log( "args must be Type String"  ) ;
								} ;
							}( this ) ;
							
					//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
					if( array.length < 2 || !field || typeof array[ 0 ] !== "object" ) return array ;
					//数字类型排序
// 					array[ 0 ][ field ].match(/[^\d]/ig) ;
					if
					( 
						// typeof array[ 0 ][ field ] === "number" 
						!/[^\d]/ig.test( array[ 0 ][ field ] )
					) 
					{
						array.sort(
							function( x , y ) 
							{ 
								return x[ field ] > y[ field ] ;
							} 
						) ;
					} ;
					//字符串类型排序
					if
					( 
						// typeof array[ 0 ][ field ] === "string"
						/[^\d]/ig.test( array[ 0 ][ field ] ) 
					) 
					{
						array.sort( 
							function( x , y ) 
							{ 
								return x[ field ].localeCompare( y[ field ] ) ;
							}
						) ;
					} ;
					//倒序
					if( reverse ) 
					{
						array.reverse() ;
					} ;
					return array ;
			    } ,
			} ,
		} 

	) ;

	var defGetDomStrPatt = function ( jsonData , dataKey , pgKey )
	{
		var json = jsonData[ dataKey ] ;
		var searchStr = location.search ;

		/*$( document ).on(
			"pageInit" ,
			function ( e , pageId , $page ) 
			{
				if ( pageId == "detail-page" )
				{
					console.log( "pageId:" , pageId ) ;
					// console.log( "$page:" , $page[ 0 ].parentNode ) ;
				} ;
			} 
		) ;*/
		
		var postage = ( postage = json.postage ) == 0 ? "免运费" : postage ;
		var domStrTemp = 
				   '<li>'
                  +'    <div class="item-content list-item">'
                  +'        <div class="p">'
                  +'            <a href=" ' + document.baseURI + 'detail/' + searchStr + "&key=" + key + ' " title="">'
                  +'                <img class="p-pic" src=" ' + json.link + ' " style="visibility: visible;">'
                  +'                <span class="flag c-icon-pt"></span>'
                  +'              </a>'
                  +'        </div>'
                  +'        <div class="d">'
                  +'            <a href=" ' + document.baseURI + 'home/goods-detail.html' + searchStr + "&key=" + key + ' " title="">'
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
	var reduceCount = 0 ;
	var idxData = null ;
	var getDomStrTemp = function ( data , callback , startIdx , length , pgKey ) 
	{
		if ( !data ) 
		{ 
			$.toast( "暂无数据" ) ;
// 			throw new TypeError( "jsonData null" ) ;
// 			return ;
		} ;
		idxData = idxData ? idxData : data.setIndex() ;
		var selectSubData = data.splice( startIdx , length ) ;
		console.log( "selectSubData:" , selectSubData.length ) ;
// 		reduceCount = reduceCount == 0 ? length : reduceCount ;
		reduceCount += selectSubData.length ;
		
		var strBuffer = [] ;
		
		hfA01 : for ( var selectSubDataKey in selectSubData )
		{
			if ( !selectSubData.hasOwnProperty( selectSubDataKey ) ) continue hfA01 ;
// 			var searchKey = reduceCount - Math.abs( selectSubData.length - selectSubDataKey ) ;
			var searchKey = selectSubData[ selectSubDataKey ][ "index" ] - 1 ;
			var domStrTemp = callback( selectSubData , selectSubDataKey , searchKey , pgKey ) ;
			strBuffer.push( domStrTemp ) ;
		} ;
		// console.log( "strBuffer:" , strBuffer ) ;
		return { reduceData : data , domStrTemp : strBuffer } ;
	} ;
	
	var pgInfi = function ( reduceData , domDom , anchorDom , getDomStrPatt , pgKey )
	{
    	console.log( "pgInfireduceData:" , reduceData ) ;
    	var loading = false ;
         
        domDom
        .on( 
            'infinite' , 
            function ( e ) 
            {
//             	console.log( "e:" , e ) ;
                if (loading) return ;

                loading = true ;
                setTimeout( 
                    function () 
                    {
                        loading = false ;

                        var domStrTemp = getDomStrTemp( reduceData , getDomStrPatt , 0  , 4 , pgKey ).domStrTemp ;
                      	anchorDom.append( domStrTemp.join( "" ) ) ;	
                    } , 
                    1000 
                ) ;
            }
        ) ;
      
	} ;
	function defCallBack 
	( getDomStrRes , anchorDom , getDomStrPatt , $page , pgKey )
	{
		$page = $page ? $page : $( "#page-infinite-scroll" ) ;
		pgInfi( getDomStrRes.reduceData , $page , anchorDom , getDomStrPatt , pgKey ) ;

	} ;
	function fn_getAjax
	( pgp_docSerh , servCls , anchorDom , getDomStrPatt , callback , $page , sortType )
	{
		sortType = sortType ? sortType : "_bid" ;
		getDomStrPatt = getDomStrPatt ? 
						getDomStrPatt : 
						getDomStrPatt === null ?
						getDomStrPatt :
						defGetDomStrPatt ;

		callback = callback ? 
				   callback : 
				   callback === null ? 
				   function () { return } : 
				   defCallBack ;

		var servClsKey = ( servClsKey = Object.keys( pgp_docSerh )[ 0 ] ) ? servClsKey : "scm" ;
		servCls = servCls ? servCls : pgp_docSerh[ servClsKey ] ;
		var pgKey = pgp_docSerh[ "pgKey" ] ;
		
		var governStrBuf = new Array() ;
		governStrBuf.push( pgp_envState.pgp_envOpt.any_servBaseUrl + pgp_docSerh[ "scm" ] + "?" ) ;
		hfA01 : for ( var sechKey in pgp_docSerh )
		{
			if ( !pgp_docSerh.hasOwnProperty( sechKey ) && sechKey == "scm" ) continue hfA01 ;
			governStrBuf.push(
				  sechKey
				+ "="
				+ pgp_docSerh[ sechKey ] 
				+ "&"
			) ;
			 
		} ;

		
	/*	if ( pgp_docSerh.constructor.name == "Object" )
		{
			var governStrBuf = new Array() ;

			governStrBuf.push( "http://192.168.1.3:8080/mall_a01/" + pgp_docSerh[ "scm" ] + "?" ) ;
			hfA01 : for ( var sechKey in pgp_docSerh )
			{
				if ( !pgp_docSerh.hasOwnProperty( sechKey ) && sechKey == "scm" ) continue hfA01 ;
				governStrBuf.push(
					  sechKey
					+ "="
					+ pgp_docSerh[ sechKey ] 
					+ "&"
				) ;
				 
			} ;
			

		} ; */
		$.ajax(
			{

				// url : "http://localhost:8081/mall_a01/overcoat?" ,
				url : governStrBuf.join( "" ) ,
				crossDomain : true ,
				type : "get" ,
				dataType : "jsonp" ,
				mimeType : "text/javascript" ,
				scriptCharSet : "utf-8" ,
				jsonp : "jsonp" ,
				jsonpCallback : "mSearchjsonp" + ( ( servCls ) + 1 ) ,
				success : function ( data )
				{
					// $.init() ;
					console.log( "data" , data ) ;
					
					
					var getConData = function()
								{
									var governAryKey = Object.keys( data )[ 0 ] ;
									if ( !governAryKey ) 
									{ 
										$.toast( "暂无数据" ) ;
							// 			throw new TypeError( "jsonData null" ) ;
							// 			return ;
									} ;
									var governAry = data[ governAryKey ] ;
									hfR01 : for( var dk in data )
									{
										if ( !data.hasOwnProperty( dk ) || dk == governAryKey ) continue hfR01 ;
										governAry = governAry.concat( data[ dk ] ) ;
									} ;
									// var sortDataField = "" ;
									switch ( sortType )
									{
										case "" :
											// sortDataField = "title" ;
											governAry.JaSortByType( "title" , false ) ;
										break ;
										case "_bid" :
											// sortDataField = "price_integer" ;
											governAry.JaSortByType( "price_integer" , false ) ;
										break ;
										case "bid" :
											// sortDataField = "price_integer" ;
											governAry.JaSortByType( "price_integer" , true ) ;
										break ;
									} ;
									
									
									// governAry[ sortDataField ].sort(
									// function ( a , b )
									// 	{
									// 		return a > b ;
									// 	} ;
									// ) ;
									
									return governAry ;
								} ;
					var conData = getConData() ;
					var result = !isNaN( pgKey ) && pgKey != undefined && pgKey != null && pgKey !== "" ? 
								function () 
								{
									return new Array( conData[ pgKey ] ) ;
								}() : 
								conData ;

					var getDomStrRes = getDomStrTemp( result , getDomStrPatt , 0 , 6 , pgKey ) ;
					anchorDom.append( getDomStrRes.domStrTemp.join( "" ) ) ;
					callback( getDomStrRes , anchorDom , getDomStrPatt , $page ) ;
					// $.init() ;
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
	
// 	$( document ).on(
// 		"pageInit" ,
// 		function ( e , pageId , $page )
// 		{
// 			console.log( "e:" , e ) ;
// 			if 
// 			( pageId == "page-infinite-scroll" )
// 			{
// 				// console.log( "pageId:" , pageId ) ;
// 				// var pgp_docSerh = String.prototype.fnPgp_getDocSerh() ;
// 				// console.log( "pgp_docSerh:" , pgp_docSerh );
// 				// fn_getAjax( pgp_docSerh , Object.keys( pgp_docSerh )[ 0 ] , true ) ;
			
// 			} ;
// 		} 
// 	) ;


	window.$searchGetJson = 
	{
		fn_getAjax : fn_getAjax ,
	} ;

	Object.defineProperties(
		window ,
		{
			"$searchGegJson" : {
				enumerable : false ,
				configurable : true ,
				writable : true ,
				value : fn_getAjax ,
			} ,
		} 
		
	) ;

	// $.init() ;
	// location.reload() ;
})( $ ) ;
console.log( "search-get-json.js" ) 
// $.init() ;