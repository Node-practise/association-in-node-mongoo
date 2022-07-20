## Tutorial Blog data model.

```
  Tutorial has some Images
  Tutorial has many Comments
  Category has a lot of Tutorials

  Based on the Quantity, we can distinguish between three types one-to-many relationships.
    > One-to-Few
    > One-to-many
    > One-to-alot

  Depending on the types of relationships, We perform
    > data access patters( denormalizing )
    > data cohesion( normalizing )


  Using normalization for Tutorial and Comment model. We require comment's id array in Tutorial model. this type of referencing is called ``Child Referencing``.
  Let’s think about the array with all the IDs. The problem here is that this array of IDs can become very large if there are lots of children. This is an anti-pattern in MongoDB that we should avoid at all costs.

That’s why we have Parent Referencing. In each child document we keep a reference to the parent element

Example: a Category could have a lot of Tutorials, we don’t want to make a categories array with 200-500 items, so we normalize data with Parent Referencing.
  // Category
    {
      _id: "5db66dd1f4892d34f4f4451a",  
      name: "Node.js",
      description: "Node.js tutorial",
    }
    // Tutorials
    { _id: "5db66dcdf4892d34f4f44515",
      title: "Tutorial #1",  
      author: "bezkoder",
      category_id: "5db66dd1f4892d34f4f4451a"
    }
    { 
      _id: "5db66dd3f4892d34f4f4451b",
      title: "Tutorial #2",
      author: "bezkoder",
      category_id: "5db66dd1f4892d34f4f4451a"
    }
    ...

  We have total 4 model
    1. Category
    2. Comment
    3. Image
    4. Tutorial

  Relationship
    1. Tutorial has one-to-many( few ) relationship with image.
    2. Tutorial has one-to-many ( MANY ) relationship with comment.
    3. Tutorial has one-to-many ( ALOT ) relationship with CATEGORY.

  Note:
    With many-to-many relationship, We always use normalizing of data.
```

