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
      
    




        
<div class="container">


<div class="panel panel-primary">
    <div class="panel-heading" >People Speak
 &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; 
    <button class="btn btn-warning btn-circle" id="roundbutton">
    <i class='fas fa-microphone' style='font-size:20px;color:white'></i>
    </button>
    </div>
    </div>  

<div id="myCarousel" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner">
    <div class="item active">
    <img src="https://www.google.co.in/search?q=dhoni+images&rlz=1C1GCEU_enIN820IN820&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjimq71iLHeAhVYWX0KHWOAAvQQ_AUIDigB&biw=1350&bih=648#imgrc=DDRdzhEx6KipYM" alt="New York">


    </div>

    <div class="item">
    <button type="button" class="btn btn-warning">Warning</button>

    </div>
  
    <div class="item">
    <button type="button" class="btn btn-danger">Danger</button>
    </div>
  </div>

  <!-- Left and right controls -->
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>



   `;
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
