$(document).ready(function() {
      var flickr = new Flickr({
              api_key: "c7220e0663bcfb1b954cabc2031d7b58"
      });
      var searchParams = [null, null, null, null, 1];
      if($('#search-text').val() != null) {
          console.log($('#search-text').val());
          searchParams[0] = $('#search-text').val();
      }

      if($('#search-user-name').val() != null) {
          searchParams[1] = $('#search-user-name').val();
      }

      if($('#search-uploaded-since').val() != null) {
          searchParams[2] = $('#search-uploaded-since').val();
      }

      if($('#search-uploaded-until').val() != null) {
          searchParams[3] = $('#search-uploaded-until').val();
      }

      $('#search-btn').click(function(e){
          if($('#search-text').val() != null) {
              console.log($('#search-text').val());
              searchParams[0] = $('#search-text').val();
          }

          if($('#search-user-name').val() != null) {
              searchParams[1] = $('#search-user-name').val();
          }

          if($('#search-uploaded-since').val() != null) {
              searchParams[2] = $('#search-uploaded-since').val();
          }

          if($('#search-uploaded-until').val() != null) {
              searchParams[3] = $('#search-uploaded-until').val();
          }
          if(searchParams[0] == null && searchParams[1] == null && searchParams[2] == null && searchParams[3] == null) {
            alert("Please enter any query!");
          }
          get_results_ten(searchParams);
      });
      
      $('#next-page').click(function() {

          get_results_ten(searchParams);
          
      });
      
      function get_results_ten (searchParams) {
          // if search by user name, return the user_id
          if(searchParams[1] != null) {
              flickr.people.findByUsername({
                username: searchParams[1]
              }, function(err, result) {
                  searchParams[1] = result.user.nsid;
            });
          }

          flickr.photos.search({
            text: searchParams[0],
             user_id: searchParams[1],
             min_upload_date: searchParams[2],
             max_upload_date: searchParams[3],
             page: searchParams[4],
            }, function(err, result) {
                if(result != null) {
                    var html = '';
                    var next = '';
                    var index;
                    var total = result.photos.total;
                    var pages = result.photos.pages; // perpage is 100 default
                    var photoCount = 0;
                    var page = 1;

                    if(pages > 1) {
                        // this is complicated
                        photoCount = 10;
                        for(index = 0; index < photoCount; index ++) {
                            var value = result.photos.photo[index];
                            var img_url='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
                            var viewImage_url = 'viewImage.html?img_url=' + img_url;
                            var profile_url = 'https://www.flickr.com/people/' + searchParams[1];
                            var photos_url = 'https://www.flickr.com/photos/' + searchParams[1];
                            html += '<div class="col-md-4">';
                            html += '<a href="'+viewImage_url+'"><img src="'+img_url+'" height="150" width="200" style="padding-top: 20px;"></a>';
                            html += '<div><a href="'+profile_url+'" id="profile_url">User Profile</a></div>';
                            html += '<div><a href="'+photos_url+'" id="user-photos">User Photos</a></div>';
                            html += '</div>';
                        }
                        $('#main').append(html);
                        next += '<div>';
                        next += '<button id="next-page" type="button" class="btn btn-info btn-sm">';
                        next += 'Next';
                        next += '</button>';
                        next += '</div>';
                        $('#next').append(next);

                        
                        $('#next-page').click(function() {
                           
                            $('#next-page').remove();
                            photoCount = photoCount + 10;
                            if(photoCount <= 100) {
                                html = '';
                                for(index = photoCount; index < photoCount + 10; index ++) {
                                    var value = result.photos.photo[index];
                                    var img_url='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
                                    var viewImage_url = 'viewImage.html?img_url=' + img_url;
                                    var profile_url = 'https://www.flickr.com/people/' + searchParams[1];
                                    var photos_url = 'https://www.flickr.com/photos/' + searchParams[1];
                                    html += '<div class="col-md-4">';
                                    html += '<a href="'+viewImage_url+'"><img src="'+img_url+'" height="150" width="200" style="padding-top: 20px;"></a>';
                                    html += '<div><a href="'+profile_url+'" id="profile_url">User Profile</a></div>';
                                    html += '<div><a href="'+photos_url+'" id="user-photos">User Photos</a></div>';
                                    html += '</div>';
                                } 
                                $('#main').append(html);
                                next += '<div>';
                                next += '<button id="next-page" type="button" class="btn btn-info btn-sm">';
                                next += 'Next';
                                next += '</button>';
                                next += '</div>';
                                $('#next').append(next);
                            }
                            else { // need to call flickr.photos.search again to fetch the next page

                            }
                        });

                    }
                    else if (pages == 1 && total >= 10) {
                        photoCount = 10;
                        for(index = 0; index < photoCount; index ++) {
                            var value = result.photos.photo[index];
                            var img_url='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
                            var viewImage_url = 'viewImage.html?img_url=' + img_url;
                            var profile_url = 'https://www.flickr.com/people/' + searchParams[1];
                            var photos_url = 'https://www.flickr.com/photos/' + searchParams[1];
                            html += '<div class="col-md-4">';
                            html += '<a href="'+viewImage_url+'"><img src="'+img_url+'" height="150" width="200" style="padding-top: 20px;"></a>';
                            html += '<div><a href="'+profile_url+'" id="profile_url">User Profile</a></div>';
                            html += '<div><a href="'+photos_url+'" id="user-photos">User Photos</a></div>';
                            html += '</div>';
                        }
                        $('#main').append(html);
                        next += '<div>';
                        next += '<button id="next-page" type="button" class="btn btn-info btn-sm">';
                        next += 'Next';
                        next += '</button>';
                        next += '</div>';
                        $('#next').append(next);
                        $('#next-page').click(function() {
                            $('#next-page').remove();
                            photoCount = photoCount + 10;
                            if(photoCount <= total) {
                                html = '';
                                for(index = photoCount; index < photoCount + 10; index ++) {
                                    var value = result.photos.photo[index];
                                    var img_url='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
                                    var viewImage_url = 'viewImage.html?img_url=' + img_url;
                                    var profile_url = 'https://www.flickr.com/people/' + searchParams[1];
                                    var photos_url = 'https://www.flickr.com/photos/' + searchParams[1];
                                    html += '<div class="col-md-4">';
                                    html += '<a href="'+viewImage_url+'"><img src="'+img_url+'" height="150" width="200" style="padding-top: 20px;"></a>';
                                    html += '<div><a href="'+profile_url+'" id="profile_url">User Profile</a></div>';
                                    html += '<div><a href="'+photos_url+'" id="user-photos">User Photos</a></div>';
                                    html += '</div>';
                                } 
                                $('#main').append(html);
                                next += '<div>';
                                next += '<button id="next-page" type="button" class="btn btn-info btn-sm">';
                                next += 'Next';
                                next += '</button>';
                                next += '</div>';
                                $('#next').append(next);
                            }
                            else {
                              alert("No more photos!");
                            }
                        });

                    }// end if one page and total > 10
                    else {
                        for(index = 0; index < total; index ++) {
                            var value = result.photos.photo[index];
                            var img_url='https://farm'+value.farm+'.staticflickr.com/'+value.server+'/'+value.id+'_'+value.secret+'.jpg';
                            var viewImage_url = 'viewImage.html?img_url=' + img_url;
                            var profile_url = 'https://www.flickr.com/people/' + searchParams[1];
                            var photos_url = 'https://www.flickr.com/photos/' + searchParams[1];
                            html += '<div class="col-md-4">';
                            html += '<a href="'+viewImage_url+'"><img src="'+img_url+'" height="150" width="200" style="padding-top: 20px;"></a>';
                            html += '<div><a href="'+profile_url+'" id="profile_url">User Profile</a></div>';
                            html += '<div><a href="'+photos_url+'" id="user-photos">User Photos</a></div>';
                            html += '</div>';
                        }
                        $('#main').append(html);
                        var next ='';
                        next += '<div><p>No More Photos<p>';
                        next += '</div>';
                        $('#next').append(next);

                    }// end if less than 10 photos
                } // end if result != null
                
                else {
                    alert("No results returned!");
                }             
          });            
      }


      
})