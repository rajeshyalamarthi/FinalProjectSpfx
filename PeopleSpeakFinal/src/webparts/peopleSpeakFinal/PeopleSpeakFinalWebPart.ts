import { Version,Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import{SPComponentLoader} from '@microsoft/sp-loader';
require('jquery');
import * as $ from 'jquery';
require("bootstrap");
import styles from './PeopleSpeakFinalWebPart.module.scss';
import * as strings from 'PeopleSpeakFinalWebPartStrings';

export interface IPeopleSpeakFinalWebPartProps {
  description: string;
}

export default class PeopleSpeakFinalWebPart extends BaseClientSideWebPart<IPeopleSpeakFinalWebPartProps> {

  public render(): void {

    let cssurl="https://stackpath.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    let w3style="https://www.w3schools.com/w3css/4/w3.css";
    let glyphicon='https://use.fontawesome.com/releases/v5.4.1/css/all.css';
    SPComponentLoader.loadCss(cssurl);
    SPComponentLoader.loadCss(w3style);
    SPComponentLoader.loadCss(glyphicon);

    this.domElement.innerHTML = `
      
    




        



    <div class="panel panel-default">
    <div class="panel-heading col-md-12"  style="background-color: #023576; color: #ccd6e4;">
      <div style="float: left; font-size:large;">People Speak</div> 
      <div style="float: right;"> 
      <button class="btn btn-warning btn-circle btn-xs" id="roundbutton">
      <i class='fas fa-microphone' style='font-size:20px;color:white;margin-top: 6px;'></i>
      </button>
      
      </div>   
    </div>
    <!--   <div class="panel-body"> -->
    
    


    
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Indicators -->
     
    
      <!-- Wrapper for slides -->
      <div class="carousel-inner" id="Innerbind">
      
      <span class='carousel-caption'>
      
      </span>
      </div>
    
      <!-- Left and right controls -->
      <a class="left carousel-control" href="#myCarousel" data-slide="next" style="margin-top:50%;height: max-content;">
      <button class="btn btn-sq btn-warning btn-xs" style="margin-right: 45%;">
      <i class='fas fa-angle-left fa-2x' style=''></i>
      </button>
      </a>

     
      
            <a class="right carousel-control" href="#myCarousel" data-slide="next" style="margin-top:50%; height: max-content;">
            <button class="btn btn-sq btn-warning btn-xs" style="margin-left: 45%; btn-xs">
          <i class='fas fa-angle-right fa-2x' style=''></i>
        </button>
      </a>
      
    </div>
   

   



    </div>
  <!--  </div>  -->  


  <!-- <div class="col-md-12 text-center-block">  -->
<button type="button" id="NavigationList" class="btn btn-warning btn-sm center-block " style="color:#0000ff; position: absolute; top:92%; right:39%;">View All</button>
  <!--  </div>   -->
   `;

this.DisplayData();

  }


  private DisplayData(){


    var curl = this.context.pageContext.web.absoluteUrl;
    let html: string = '';
    if (Environment.type === EnvironmentType.Local) {
      this.domElement.querySelector('#test').innerHTML = "sorry this does not work in local workbench";
    }

    else{
      //ajaxcall

      var call = $.ajax({
       url: curl + "/_api/web/lists/getByTitle('SpfxPeopleSpeak')/Items/?$select= Id,Title,Designation,Picture",//&$top=3&$orderby=Id desc",
        type: "GET",
        dataType: "json",
        headers: {
          Accept: "application/json;odata=verbose"
        }
      });

    call.done(function (data,textStatus,jqXHR) {
   
      var Slider = $("#Innerbind");
       var Active;
   
      $.each(data.d.results, function (index,value) {
       if(index=='0')
       {
         Active="item active"
        }
       
       else
       {
         Active="item"
        };
   // binding data to wrapper for slides 
   
   //alert(value.Title);
  // alert(value.Designation);
  // alert(value.Picture.Description);

      Slider.append("<div class='"+Active+"'><img src='"+value.Picture.Description+"' style='width:100%;height:230px;opacity: 1;'><div class='carousel-caption' style='position: absolute;bottom: 8px;left: 16px; padding-bottom: 0px;'><h6><p style='background-color:#080808; opacity:0.6;'>"+value.Title+"<br/><i>"+value.Designation+"</i></p></h6></div>  </div>");
     }); 


     });

   call.fail(function (jqXHR, textStatus, errorThrown) {
     var response = JSON.parse(jqXHR.responseText);
     var message = response ? response.error.message.value : textStatus;
     alert("Call failed. Error: " + message);
   });

   $(document).on("click","#NavigationList",function(){

    window.location.href="https://acuvateuk.sharepoint.com/sites/TrainingDevSite/Lists/SpfxPeopleSpeak/AllItems.aspx";

   })
   
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
