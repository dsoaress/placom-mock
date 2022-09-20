import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
import _ from "underscore";

type Typology = {
  id: number;
  name: string;
  products: Product[];
};

type Product = {
  id: number;
  typologyId: number;
  lmCode: string;
  lmDesc: string;
  saleAmbition?: number;
  salePrice?: number;
  totalAmount?: number;
  articles: Product[];
  linelinst: Product[];
};

type Db = {
  typologies: Typology[];
  products: Product[];
};

const db: Db = {
  typologies: [],
  products: [],
};

Factory.define("opecom")
  .sequence("id")
  .attr("name", () => faker.lorem.sentence())
  .attr("description", () => faker.lorem.paragraphs(2));

Factory.define("typology")
  .sequence("id")
  .attr("name", () => faker.lorem.sentence());

Factory.define("product")
  .sequence("id")
  .attr("lmCode", () => faker.random.numeric(6))
  .attr("lmDesc", () => faker.lorem.sentence())
  .attr("saleAmbition", () => faker.datatype.number())
  .attr("salePrice", () => faker.datatype.float({ precision: 0.01 }));

_(150).times(() => {
  const typology = Factory.build<Typology>("typology");

  _(10).times(() => {
    const product = Factory.build<Product>("product");
    product.typologyId = typology.id;
    product.articles = [];
    product.linelinst = [];

    _(10).times(() => {
      const article = Factory.build<Product>("product");
      article.linelinst = [];

      _(10).times(() => {
        const linelinst = Factory.build<Product>("product");
        article.linelinst.push(linelinst);
      });

      product.articles.push(article);
    });

    _(10).times(() => {
      const linelinst = Factory.build<Product>("product");
      product.linelinst.push(linelinst);
    });

    db.products.push(product);
  });

  db.typologies.push(typology);
});

export { db };
