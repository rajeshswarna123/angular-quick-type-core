import { Component, OnInit } from '@angular/core';
import { InputData, jsonInputForTargetLanguage, quicktype, TargetLanguage } from "quicktype-core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  
  code: string =" hello";
  JSONData = {
      "greeting": "Welcome to quicktype!",
      "instructions": [
        "Type or paste JSON here",
        "Or choose a sample above",
        "quicktype will generate code in your",
        "chosen language to parse the sample data"
      ]
    };
  ngOnInit(){
     this.quicktypeJSON("csharp","FakeWiser",JSON.stringify(this.JSONData)).then(response=>{
       this.code = response.lines.join("\n");
     });
  }

  async generateUsingJSON() {
    const { lines: generatedClass } = await this.quicktypeJSON(
      "csharp",
      "FakeWiser",
      JSON.stringify(this.JSONData)
    );
    this.code = generatedClass.join("\n")
  }

  async quicktypeJSON(targetLanguage: string | TargetLanguage, className: string, jsonString) {
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
    await jsonInput.addSource({
      name: className,
      samples: [jsonString],
    });

    const inputData = new InputData();
    inputData.addInput(jsonInput);
     
    return await quicktype({
      inputData,
      lang: targetLanguage,
    });
  }
}
