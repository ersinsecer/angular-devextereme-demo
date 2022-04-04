import {
  NgModule,
  Component,
  enableProdMode,
  OnInit,
  ViewChild,
} from "@angular/core";
import CustomStore from "devextreme/data/custom_store";
import { ProductService } from "src/app/services/product.service";
import notify from "devextreme/ui/notify";
import { custom } from "devextreme/ui/dialog";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productDataSource: any = {};

  ngOnInit() {}

  constructor(private productService: ProductService) {
    this.productDataSource = new CustomStore({
      load(loadOptions: any) {
        var params = "";
        params += "skip=" + loadOptions["skip"];
        params += "&pageSize=" + loadOptions["take"];

        return productService
          .getProducts(params)
          .toPromise()
          .then((data: any) => ({
            data: data.List,
            totalCount: data.Count,
          }))
          .catch((error) => {
            throw "Data Loading Error";
          });
      },
    });

    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(item) {
    let myDialog = custom({
      showTitle: false,
      messageHtml: "İlgili kayıt silinecektir. Emin misiniz?",
      buttons: [
        {
          text: "Evet",
          onClick: (e) => {
            this.productService
              .deleteProduct(item.row.data.Id)
              .subscribe((response) => {
                if (response.IsSuccessful) {
                  myDialog.hide();
                  item.component.refresh();
                  notify(
                    {
                      message: `${item.row.data.Id} numaralı kayıt başarılı bir şekilde silindi.`,
                      width: 500,
                      shading: false,
                    },
                    "success",
                    3000
                  );
                } else {
                  myDialog.hide();
                  notify(
                    {
                      message: response.ExceptionMessage,
                      width: 500,
                      shading: false,
                    },
                    "error",
                    4000
                  );
                }
              });
          },
        },
        {
          text: "Hayır",
          onClick: (e) => {
            myDialog.hide();
          },
        },
      ],
    });

    myDialog.show();
  }
}
function isNotEmpty(value: any): boolean {
  return value !== undefined && value !== null && value !== "";
}
