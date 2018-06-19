$(document).ready(function() {

  //<![CDATA[
	
		jQuery(function($) {
	
      // Your eBay appid (get one at http://developer.ebay.com/join/)
    
      $.ebay.appid = "JuanVill-FindYour-PRD-fabd43d69-c5edfe8f";
    
      // 0=US site, use 3 for the uk
    
      // See http://developer.ebay.com/DevZone/XML/docs/WebHelp/FieldDifferences-Site_IDs.html
    
      $.ebay.siteid = 0; 
    
    
    
      $(document).ready(function () {
    
        // FindItems
    
        $("#SubmitButton").click(
    
        function () {
    
    
          $.ebay.call("FindItems", 
    
                {QueryKeywords: $("#SearchProduct").val(),
    
                 HideDuplicateItems: true,
    
                 MaxEntries: 10},
    
                function (response) {
    
                /*
                Response gives us an array of Item Objects.
                Item array blueprint {
                   ConvertedCurrencyPrice( Object ) {
                    CurrencyID: returns the currency, ie: USD
                    Value: returns current price of the item
                  }
                   GalleryURL: returns a URL that we can use as our img src
                   ListingStatus: returns either active or inactive
                   PrimaryCategoryName: returns item category
                   Title: returns item title
                   ShippingCostService (Object) {
                     CurrencyID: returns currency
                     Value: returns price of shipping
                   }
                   ViewItemURLForNaturalSearch: returns item URL to eBay website
                }
                */
                
    
    
    
         var items = response.Item || [];
                
        $("#ProductContainer").html("");
         $.each(items, function (i, item) {
           var title = item.Title;
           var galleryURL = item.GalleryURL;
           var currency = item.ConvertedCurrentPrice.CurrencyID;
           var price = item.ConvertedCurrentPrice.Value;
           var shippingCost = item.ShippingCostSummary.ListedShippingServiceCost.Value;
           var url = item.ViewItemURLForNaturalSearch;
          
           //Title attribute
          // $("#productname1").text(title);
           console.log(title);
           
           //append image to the product view container
          $("#ProductContainer").append(
            "<div id=\"product\"> " +
               "<img src=\"" + galleryURL + "\">" +  
               "<div id=\"productContent\">" + 
                "<a id=\"url\" href=\"" + url + "\">" + title + "</a>" +
                "<p> $" + price + " " + currency + "</p>" + 
                "<p>Shipping Cost: $" + shippingCost + "</p> </div></div>" );
          });
    
         });
    
     });
    
    
    
     // GetSingleItem
    
     $("#getsingleitem button").click(
    
     function () {
    
       $("#getsingleitem .status").text("Loading...");
    
       $.ebay.call("GetSingleItem", 
    
         {ItemID: $("#getsingleitem input").val()},
    
         function (response) {
    
         // In the response to GetSingleItem the Item element is an object
    
         var item = response.Item || {};
    
         $("#getsingleitem ul").empty();
    
         $("#getsingleitem .status").text("Information retrieved");
    
         $.each(item, function (key, val) {
    
          $("#getsingleitem ul").append(
    
            $("<li/>").
    
            text(key + " = " + val));
    
          });
    
         });
    
     });
    
    });
    
    });
  });