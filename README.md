# **Infinite Draggable Gallery with inertia - GSAP**

An infinite, multi-directional and draggable gallery with inertia built with GSAP.

This site was built using [GSAP](https://gsap.com) with [Draggable plugin](https://gsap.com/docs/v3/Plugins/Draggable/).

## Authors

-   [Emerell Boréale](https://emerell-boreale.fr)
-   [Tristan Viard](https://github.com/valdruide/)

## Infos

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=valdruide_infinite-draggable-gallery&metric=bugs)](https://sonarcloud.io/summary/new_code?id=valdruide_infinite-draggable-gallery)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=valdruide_infinite-draggable-gallery&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=valdruide_infinite-draggable-gallery)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=valdruide_infinite-draggable-gallery&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=valdruide_infinite-draggable-gallery)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=valdruide_infinite-draggable-gallery&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=valdruide_infinite-draggable-gallery)

## Demo

SOON...

## Features

-   Multi-directional drag and drop
-   Inertia
-   Responsive
-   Visual First
-   Customizable
-   Clickable elements

## Documentation

Edit the variables in `main.js`

| Variables        | Type                 | Description                                                    |
| :--------------- | :------------------- | :------------------------------------------------------------- |
| `imgWidth`       | `int`                | **Required**. Image width                                      |
| `imgHeight`      | `int`                | **Required**. Image height                                     |
| `imgURLArray`    | `array`              | Images array                                                   |
| `rowNum`         | `int`                | **Required**. Rows number                                      |
| `imgNum`         | `int`                | **Required**. Images number per row                            |
| `gutter`         | innerWidth + `float` | **Required**. Space between elements                           |
| `edgeResistance` | `float`              | **Required**. Resistance at the edge of the grid               |
| `dragResistance` | `float`              | **Required**. Adjust drag speed                                |
| `allImgs`        | `node`               | **Required**. Select all images to apply effects when dragging |

-   If you want to use your own images, use `imgURLArray`

#### Adjust the images effect when dragging in the `Draggable.create()` function:

```JavaScript
onDrag: function() {
    allImgs.forEach((img) => {
        img.style.backgroundSize = '110%';
    });
}

onDragEnd: function () {
    allImgs.forEach((img) => {
        img.style.backgroundSize = '100%';
    });

}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Roadmap

-   [x] Movement effect on drag
-   [x] Inertia
-   [ ] Mouse movement effect
-   [ ] Clickable elements
-   [ ] Responsive

## Screenshots

#### **Without dragging :**

![App Screenshot](https://i.imgur.com/W2gJwZX.png)

#### **When dragging :**

![App Screenshot](https://i.imgur.com/DHPNAyx.png)
