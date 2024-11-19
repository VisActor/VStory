---
category: examples
group: works-show
title: visualize-history
keywords: visualize-history
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/screenshot-20240715-204217.png
---

# `可视化历史` 作品展示

该作品展示了可视化发展历史中不同图表是如何被创造和发展的，深入探讨了各类图表在数据表达中的演变过程。通过对比历史上重要的图表设计与技术创新，作品揭示了从简单的线条和符号到复杂的交互式可视化界面，图表形式如何不断适应人类对信息理解和传达的需求。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();

const dsl = {
    "characters": [
        {
            "type": "VChart",
            "id": "chart0",
            "zIndex": 1,
            "position": {
                "top": 50,
                "left": 220,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "rangeColumn",
                    "title": {
                        "text": "Timeline Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "direction": "horizontal",
                    "minField": "value",
                    "maxField": "value2",
                    "yField": "type",
                    "bar": {
                        "maxWidth": 2,
                        "style": {
                            "maxWidth": 2
                        }
                    },
                    "label": {
                        "style": {
                            "visible": false
                        }
                    },
                    "axes": [
                        {
                            "orient": "bottom",
                            "domainLine": {
                                "visible": true
                            },
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "left",
                            "domainLine": {
                                "visible": false
                            },
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "padding": 12,
                    "data": [
                        {
                            "id": "id0",
                            "values": [
                                {
                                    "type": "a",
                                    "value": 0.36,
                                    "value2": 0.06
                                },
                                {
                                    "type": "b",
                                    "value": 0.66,
                                    "value2": 0.26
                                },
                                {
                                    "type": "c",
                                    "value": 0.4,
                                    "value2": 0
                                },
                                {
                                    "type": "d",
                                    "value": 0.6,
                                    "value2": 0.2
                                }
                            ]
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart1",
            "zIndex": 1,
            "position": {
                "top": 50,
                "left": 402,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "bar",
                    "color": [
                        "#4CC9E4",
                        "#4954E6"
                    ],
                    "title": {
                        "text": "BarChart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "xField": [
                        "x",
                        "type"
                    ],
                    "yField": "y",
                    "seriesField": "type",
                    "bar": {
                        "style": {
                            "fill": {
                                "gradient": "linear",
                                "stops": [
                                    {
                                        "offset": 1
                                    },
                                    {
                                        "offset": 0,
                                        "opacity": 0.6
                                    }
                                ]
                            }
                        },
                        "state": {
                            "selected": {
                                "stroke": "#000",
                                "strokeWidth": 1
                            }
                        }
                    },
                    "label": {
                        "style": {
                            "visible": false
                        }
                    },
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "x": "Mon",
                                    "y": 100,
                                    "type": "销售额"
                                },
                                {
                                    "x": "Tues",
                                    "y": 66,
                                    "type": "销售额"
                                },
                                {
                                    "x": "Wed",
                                    "y": 95,
                                    "type": "销售额"
                                },
                                {
                                    "x": "Mon",
                                    "y": 43,
                                    "type": "利润"
                                },
                                {
                                    "x": "Tues",
                                    "y": 80,
                                    "type": "利润"
                                },
                                {
                                    "x": "Wed",
                                    "y": 68,
                                    "type": "利润"
                                }
                            ]
                        }
                    ],
                    "axes": [
                        {
                            "orient": "bottom",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "left",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart2",
            "zIndex": 1,
            "position": {
                "top": 50,
                "left": 584,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "area",
                    "title": {
                        "text": "Line/Area Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "xField": "x",
                    "yField": "y",
                    "seriesField": "type",
                    "point": {
                        "visible": false
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data2",
                            "values": [
                                {
                                    "x": 1,
                                    "y": 70,
                                    "type": "a"
                                },
                                {
                                    "x": 2,
                                    "y": 20,
                                    "type": "a"
                                },
                                {
                                    "x": 3,
                                    "y": 30,
                                    "type": "a"
                                },
                                {
                                    "x": 4,
                                    "y": 10,
                                    "type": "a"
                                },
                                {
                                    "x": 1,
                                    "y": 70,
                                    "type": "b"
                                },
                                {
                                    "x": 2,
                                    "y": 20,
                                    "type": "b"
                                },
                                {
                                    "x": 3,
                                    "y": 30,
                                    "type": "b"
                                },
                                {
                                    "x": 4,
                                    "y": 10,
                                    "type": "b"
                                }
                            ]
                        }
                    ],
                    "axes": [
                        {
                            "orient": "bottom",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "left",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart3",
            "zIndex": 1,
            "position": {
                "top": 50,
                "left": 766,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "pie",
                    "title": {
                        "text": "Pie Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "animation": true,
                    "data": [
                        {
                            "id": "data1",
                            "values": [
                                {
                                    "value": 348,
                                    "name": "中介渠道: 34.8%"
                                },
                                {
                                    "value": 152,
                                    "name": "会员: 15.2%"
                                },
                                {
                                    "value": 500,
                                    "name": "散客: 50%"
                                }
                            ]
                        }
                    ],
                    "valueField": "value",
                    "categoryField": "name",
                    "radius": 1,
                    "innerRadius": 0,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart4",
            "zIndex": 1,
            "position": {
                "top": 50,
                "left": 948,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "scatter",
                    "title": {
                        "text": "Scatter Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data2",
                            "values": [
                                {
                                    "x": 1,
                                    "y": 70,
                                    "type": "a"
                                },
                                {
                                    "x": 2,
                                    "y": 20,
                                    "type": "a"
                                },
                                {
                                    "x": 3,
                                    "y": 30,
                                    "type": "a"
                                },
                                {
                                    "x": 4,
                                    "y": 10,
                                    "type": "a"
                                },
                                {
                                    "x": 1,
                                    "y": 70,
                                    "type": "b"
                                },
                                {
                                    "x": 2,
                                    "y": 20,
                                    "type": "b"
                                },
                                {
                                    "x": 3,
                                    "y": 30,
                                    "type": "b"
                                },
                                {
                                    "x": 4,
                                    "y": 10,
                                    "type": "b"
                                }
                            ]
                        }
                    ],
                    "axes": [
                        {
                            "orient": "bottom",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "left",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "xField": "x",
                    "yField": "y",
                    "seriesField": "type",
                    "point": {
                        "style": {
                            "size": 4
                        }
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart5",
            "zIndex": 1,
            "position": {
                "top": 570,
                "left": 220,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "rose",
                    "title": {
                        "text": "Rose Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data1",
                            "values": [
                                {
                                    "value": 348,
                                    "name": "中介渠道: 34.8%"
                                },
                                {
                                    "value": 152,
                                    "name": "会员: 15.2%"
                                },
                                {
                                    "value": 500,
                                    "name": "散客: 50%"
                                }
                            ]
                        }
                    ],
                    "valueField": "value",
                    "seriesField": "name",
                    "categoryField": "name",
                    "radius": 1,
                    "innerRadius": 0,
                    "axes": [
                        {
                            "orient": "radius",
                            "domainLine": {
                                "visible": false,
                                "smooth": false
                            },
                            "label": {
                                "visible": false
                            },
                            "tick": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "angle",
                            "domainLine": {
                                "visible": false,
                                "smooth": false
                            },
                            "label": {
                                "visible": false
                            },
                            "tick": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart6",
            "zIndex": 1,
            "position": {
                "top": 570,
                "left": 402,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "radar",
                    "title": {
                        "text": "Radar Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data2",
                            "values": [
                                {
                                    "theta": 0,
                                    "type": "A",
                                    "value": 833
                                },
                                {
                                    "theta": 1,
                                    "type": "A",
                                    "value": 898
                                },
                                {
                                    "theta": 2,
                                    "type": "A",
                                    "value": 672
                                },
                                {
                                    "theta": 3,
                                    "type": "A",
                                    "value": 889
                                },
                                {
                                    "theta": 4,
                                    "type": "A",
                                    "value": 889
                                },
                                {
                                    "theta": 5,
                                    "type": "A",
                                    "value": 658
                                },
                                {
                                    "theta": 6,
                                    "type": "A",
                                    "value": 822
                                },
                                {
                                    "theta": 7,
                                    "type": "A",
                                    "value": 825
                                },
                                {
                                    "theta": 0,
                                    "type": "B",
                                    "value": 659
                                },
                                {
                                    "theta": 1,
                                    "type": "B",
                                    "value": 896
                                },
                                {
                                    "theta": 2,
                                    "type": "B",
                                    "value": 822
                                },
                                {
                                    "theta": 3,
                                    "type": "B",
                                    "value": 874
                                },
                                {
                                    "theta": 4,
                                    "type": "B",
                                    "value": 742
                                },
                                {
                                    "theta": 5,
                                    "type": "B",
                                    "value": 878
                                },
                                {
                                    "theta": 6,
                                    "type": "B",
                                    "value": 643
                                },
                                {
                                    "theta": 7,
                                    "type": "B",
                                    "value": 604
                                }
                            ]
                        }
                    ],
                    "categoryField": "theta",
                    "valueField": "value",
                    "seriesField": "type",
                    "line": {
                        "style": {
                            "strokeWidth": 2
                        }
                    },
                    "legends": {
                        "visible": false
                    },
                    "label": {
                        "visible": false
                    },
                    "animationAppear": false,
                    "point": {
                        "style": {
                            "size": 2,
                            "strokeWidth": 1
                        }
                    },
                    "startAngle": 90,
                    "axes": [
                        {
                            "orient": "radius",
                            "domainLine": {
                                "visible": false,
                                "smooth": false
                            },
                            "label": {
                                "visible": false
                            },
                            "tick": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "angle",
                            "domainLine": {
                                "visible": false,
                                "smooth": false
                            },
                            "label": {
                                "visible": false
                            },
                            "tick": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animation": true
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart7",
            "zIndex": 1,
            "position": {
                "top": 570,
                "left": 584,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "wordCloud",
                    "title": {
                        "text": "Word Cloud",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data1",
                            "values": [
                                {
                                    "challenge_id": 1658490688121879,
                                    "challenge_name": "宅家剧场",
                                    "sum_count": 128
                                },
                                {
                                    "challenge_id": 1640007327696910,
                                    "challenge_name": "我的观影报告",
                                    "sum_count": 103
                                },
                                {
                                    "challenge_id": 1557656100811777,
                                    "challenge_name": "抖瓜小助手",
                                    "sum_count": 76
                                },
                                {
                                    "challenge_id": 1553513807372289,
                                    "challenge_name": "搞笑",
                                    "sum_count": 70
                                },
                                {
                                    "challenge_id": 1599321527572563,
                                    "challenge_name": "我要上热门",
                                    "sum_count": 69
                                }
                            ]
                        }
                    ],
                    "valueField": "sum_count",
                    "seriesField": "challenge_name",
                    "nameField": "challenge_name",
                    "wordCloudConfig": {
                        "drawOutOfBound": "clip"
                    },
                    "maskShape": "circle",
                    "fontSizeRange": [
                        5,
                        8
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart8",
            "zIndex": 1,
            "position": {
                "top": 570,
                "left": 766,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "treemap",
                    "title": {
                        "text": "TreeMap Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "name": "Second",
                                    "children": [
                                        {
                                            "name": "B2",
                                            "value": 98
                                        },
                                        {
                                            "name": "B3",
                                            "value": 56
                                        }
                                    ]
                                },
                                {
                                    "name": "First",
                                    "children": [
                                        {
                                            "name": "A2",
                                            "value": 60
                                        },
                                        {
                                            "name": "A3",
                                            "value": 30
                                        }
                                    ]
                                },
                                {
                                    "name": "Third",
                                    "children": [
                                        {
                                            "name": "C1",
                                            "value": 33
                                        },
                                        {
                                            "name": "C2",
                                            "value": 30
                                        },
                                        {
                                            "name": "C3",
                                            "value": 40
                                        }
                                    ]
                                },
                                {
                                    "name": "Fourth",
                                    "children": [
                                        {
                                            "name": "D4",
                                            "value": 64
                                        },
                                        {
                                            "name": "D5",
                                            "value": 60
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "categoryField": "name",
                    "valueField": "value",
                    "legends": {
                        "visible": false
                    },
                    "nodePadding": 1,
                    "nonLeaf": {
                        "visible": false
                    },
                    "nonLeafLabel": {
                        "visible": false
                    },
                    "label": {
                        "visible": false
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "VChart",
            "id": "chart9",
            "zIndex": 1,
            "position": {
                "top": 570,
                "left": 948,
                "width": 110,
                "height": 110
            },
            "options": {
                "spec": {
                    "type": "sunburst",
                    "title": {
                        "text": "Sunburst Chart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": 12,
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "name": "Grandpa",
                                    "children": [
                                        {
                                            "name": "Uncle Leo",
                                            "value": 15,
                                            "children": [
                                                {
                                                    "name": "Cousin Jack",
                                                    "value": 2
                                                },
                                                {
                                                    "name": "Cousin Mary",
                                                    "value": 5,
                                                    "children": [
                                                        {
                                                            "name": "Jackson",
                                                            "value": 2
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "Cousin Ben",
                                                    "value": 4
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Father",
                                            "value": 10,
                                            "children": [
                                                {
                                                    "name": "Me",
                                                    "value": 5
                                                },
                                                {
                                                    "name": "Brother Peter",
                                                    "value": 1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "Nancy",
                                    "children": [
                                        {
                                            "name": "Uncle Nike",
                                            "children": [
                                                {
                                                    "name": "Cousin Betty",
                                                    "value": 1
                                                },
                                                {
                                                    "name": "Cousin Jenny",
                                                    "value": 2
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "offsetX": 0,
                    "offsetY": 0,
                    "categoryField": "name",
                    "valueField": "value",
                    "outerRadius": 1,
                    "innerRadius": 0,
                    "gap": 1,
                    "sunburst": {
                        "style": {
                            "stroke": false,
                            "lineWidth": 0
                        }
                    },
                    "label": {
                        "visible": false
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "attribute": {},
                "panel": {
                    "fill": "white",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                }
            }
        },
        {
            "type": "Text",
            "id": "title1",
            "zIndex": 1,
            "position": {
                "top": 290,
                "left": 630
            },
            "options": {
                "graphic": {
                    "text": "A BRIEF HISTORY",
                    "textAlign": "center",
                    "textBaseline": "middle",
                    "fontSize": 75,
                    "fontWeight": "bold"
                }
            }
        },
        {
            "type": "Text",
            "id": "title2",
            "zIndex": 1,
            "position": {
                "top": 390,
                "left": 630
            },
            "options": {
                "graphic": {
                    "text": "OF CHARTS",
                    "textAlign": "center",
                    "textBaseline": "middle",
                    "fontSize": 75,
                    "fontWeight": "bold"
                }
            }
        },
        {
            "type": "Text",
            "id": "titlesubtitle",
            "zIndex": 1,
            "position": {
                "top": 470,
                "left": 630
            },
            "options": {
                "graphic": {
                    "width": 400,
                    "fontSize": 22,
                    "fontWeight": "bold",
                    "textAlign": "center",
                    "textBaseline": "middle",
                    "textConfig": [
                        {
                            "text": "Powered By "
                        },
                        {
                            "text": "VChart",
                            "fill": "blue"
                        }
                    ]
                }
            }
        },
        {
            "type": "Text",
            "id": "title1",
            "zIndex": 1,
            "position": {
                "top": 290,
                "left": 630
            },
            "options": {
                "graphic": {
                    "text": "A BRIEF HISTORY",
                    "fontSize": 75,
                    "fontWeight": "bold"
                }
            }
        },
        {
            "type": "Text",
            "id": "title2",
            "zIndex": 1,
            "position": {
                "top": 390,
                "left": 630
            },
            "options": {
                "graphic": {
                    "text": "OF CHARTS",
                    "fontSize": 75,
                    "fontWeight": "bold"
                }
            }
        },
        {
            "type": "Text",
            "id": "titlesubtitle",
            "zIndex": 1,
            "position": {
                "top": 470,
                "left": 770
            },
            "options": {
                "graphic": {
                    "width": 400,
                    "fontSize": 22,
                    "fontWeight": "bold",
                    "textBaseline": "middle",
                    "textConfig": [
                        {
                            "text": "Powered By "
                        },
                        {
                            "text": "VChart",
                            "fill": "blue"
                        }
                    ]
                }
            }
        },
        {
            "type": "Text",
            "id": "scene2-title2",
            "zIndex": 1,
            "position": {
                "top": 30,
                "left": 150
            },
            "options": {
                "graphic": {
                    "width": 400,
                    "fontSize": 12,
                    "fill": "#292729",
                    "textAlign": "center",
                    "textBaseline": "middle",
                    "text": "DEVELOPMENT ROADMAP"
                }
            }
        },
        {
            "type": "Timeline",
            "id": "timeline",
            "zIndex": 10,
            "position": {
                "top": 500,
                "left": 100,
                "width": 1200,
                "height": 100
            },
            "options": {
                "graphic": {
                    "times": [
                        {
                            "label": "1486",
                            "desc": ""
                        },
                        {
                            "label": "1644",
                            "desc": ""
                        },
                        {
                            "label": "1765",
                            "desc": ""
                        },
                        {
                            "label": "1786",
                            "desc": ""
                        },
                        {
                            "label": "1801",
                            "desc": ""
                        },
                        {
                            "label": "1833",
                            "desc": ""
                        },
                        {
                            "label": "1856",
                            "desc": ""
                        },
                        {
                            "label": "1877",
                            "desc": ""
                        },
                        {
                            "label": "1976",
                            "desc": ""
                        },
                        {
                            "label": "1990s",
                            "desc": ""
                        },
                        {
                            "label": "",
                            "desc": ""
                        }
                    ],
                    "lineStyle": {
                        "lineDash": [
                            1,
                            1
                        ]
                    },
                    "labelStyle": {
                        "fontSize": 16,
                        "fontWeight": "bold"
                    },
                    "activeSymbolStyle": {
                        "size": 20
                    },
                    "activeLabelStyle": {
                        "fontSize": 22,
                        "fontWeight": "bold"
                    }
                }
            }
        },
        {
            "type": "Text",
            "id": "scene3-title1",
            "zIndex": 1,
            "position": {
                "top": 100,
                "left": 200
            },
            "options": {
                "graphic": {
                    "text": "Proto Bar",
                    "fontSize": 55,
                    "fontWeight": "bold",
                    "textAlign": "left",
                    "textBaseline": "middle"
                }
            }
        },
        {
            "type": "Line",
            "id": "scene3-line-top",
            "zIndex": 1,
            "position": {
                "top": 102,
                "left": 100,
                "width": 500,
                "height": 200
            },
            "options": {
                "graphic": {
                    "lineWidth": 1,
                    "points": [
                        {
                            "x": 100,
                            "y": 34
                        },
                        {
                            "x": 350,
                            "y": 34
                        }
                    ]
                }
            }
        },
        {
            "type": "Line",
            "id": "scene3-line-bottom",
            "zIndex": 1,
            "position": {
                "top": 130,
                "left": 100,
                "width": 500,
                "height": 200
            },
            "options": {
                "graphic": {
                    "lineWidth": 1,
                    "points": [
                        {
                            "x": 100,
                            "y": 34
                        },
                        {
                            "x": 350,
                            "y": 34
                        }
                    ]
                }
            }
        },
        {
            "type": "Text",
            "id": "scene3-title-Nicole",
            "zIndex": 1,
            "position": {
                "top": 150,
                "left": 200
            },
            "options": {
                "graphic": {
                    "text": "Nicole Oresme",
                    "fontSize": 12,
                    "fontWeight": "bold",
                    "textAlign": "left",
                    "textBaseline": "middle"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-text-image-top",
            "zIndex": 1,
            "position": {
                "top": 160,
                "left": 560,
                "width": 570,
                "height": 65
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-chart-image-1",
            "zIndex": 1,
            "position": {
                "top": 250,
                "left": 560,
                "width": 200,
                "height": 160
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/chart-1.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-chart-image-2",
            "zIndex": 1,
            "position": {
                "top": 250,
                "left": 780,
                "width": 200,
                "height": 160
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/chart-2.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-chart-image-3",
            "zIndex": 1,
            "position": {
                "top": 425,
                "left": 560,
                "width": 200,
                "height": 160
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/chart-3.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-chart-image-4",
            "zIndex": 1,
            "position": {
                "top": 425,
                "left": 780,
                "width": 200,
                "height": 160
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/chart-4.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-chart-image-5",
            "zIndex": 1,
            "position": {
                "top": 250,
                "left": 1000,
                "width": 200,
                "height": 335
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/chart-5.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-text-image-bottom",
            "zIndex": 1,
            "position": {
                "top": 620,
                "left": 560,
                "width": 570,
                "height": 60
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/text-en.png"
                }
            }
        },
        {
            "type": "Text",
            "id": "scene3-title-1486",
            "zIndex": 1,
            "position": {
                "top": 150,
                "left": 420
            },
            "options": {
                "graphic": {
                    "text": "1486",
                    "fontSize": 12,
                    "fontWeight": "bold",
                    "textAlign": "left",
                    "textBaseline": "middle"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-title-image",
            "zIndex": 1,
            "position": {
                "top": 180,
                "left": 200,
                "width": 250,
                "height": 260
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/title-image.png"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene3-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 170,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#D9D4CA"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene3-background-decoration",
            "zIndex": 0,
            "position": {
                "top": 120,
                "left": 270,
                "width": 1000,
                "height": 500
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene3/decoration.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "bar",
            "zIndex": 1,
            "position": {
                "top": 250,
                "left": 900,
                "width": 260,
                "height": 335
            },
            "options": {
                "panel": {
                    "fill": "#ffffff",
                    "shadowColor": "rgba(0, 0, 0, 0.05)",
                    "shadowBlur": 10,
                    "shadowOffsetX": 4,
                    "shadowOffsetY": 4
                },
                "spec": {
                    "type": "bar",
                    "title": {
                        "text": "BarChart",
                        "orient": "bottom",
                        "align": "center",
                        "textStyle": {
                            "fontSize": 10,
                            "lineHeight": 10
                        }
                    },
                    "padding": [
                        120,
                        60,
                        75,
                        60
                    ],
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "x": "1",
                                    "y": 100,
                                    "type": "Category1"
                                },
                                {
                                    "x": "2",
                                    "y": 100,
                                    "type": "Category1"
                                },
                                {
                                    "x": "3",
                                    "y": 100,
                                    "type": "Category1"
                                },
                                {
                                    "x": "4",
                                    "y": 100,
                                    "type": "Category1"
                                },
                                {
                                    "x": "1",
                                    "y": 100,
                                    "type": "Category2"
                                },
                                {
                                    "x": "2",
                                    "y": 100,
                                    "type": "Category2"
                                },
                                {
                                    "x": "3",
                                    "y": 100,
                                    "type": "Category2"
                                },
                                {
                                    "x": "4",
                                    "y": 100,
                                    "type": "Category2"
                                }
                            ]
                        }
                    ],
                    "xField": [
                        "x",
                        "type"
                    ],
                    "yField": "y",
                    "seriesField": "type",
                    "bar": {
                        "style": {
                            "fill": {
                                "gradient": "linear",
                                "stops": [
                                    {
                                        "offset": 1
                                    },
                                    {
                                        "offset": 0,
                                        "opacity": 0.6
                                    }
                                ]
                            }
                        },
                        "state": {
                            "selected": {
                                "stroke": "#000",
                                "strokeWidth": 1
                            }
                        }
                    },
                    "label": {
                        "style": {
                            "visible": false
                        }
                    },
                    "axes": [
                        {
                            "orient": "bottom",
                            "bandPadding": 0,
                            "paddingInner": 0,
                            "paddingOuter": 0,
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        },
                        {
                            "orient": "left",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animationUpdate": {
                        "easing": "cubicInOut",
                        "duration": 1000
                    },
                    "color": [
                        "#4CC9E4",
                        "#4954E6"
                    ],
                    "animation": true,
                    "animationAppear": false
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-title-decoration",
            "zIndex": 1,
            "position": {
                "left": 200,
                "top": 140,
                "width": 130,
                "height": 26
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/title-decoration.png"
                }
            }
        },
        {
            "type": "Text",
            "id": "scene4-title",
            "zIndex": 1,
            "position": {
                "left": 200,
                "top": 200,
                "width": 400,
                "height": 100
            },
            "options": {
                "graphic": {
                    "text": "The First Chart",
                    "fontSize": 55,
                    "fontWeight": "bold",
                    "textAlign": "left"
                }
            }
        },
        {
            "type": "Text",
            "id": "scene4-subtitle",
            "zIndex": 1,
            "position": {
                "left": 200,
                "top": 256,
                "width": 300,
                "height": 100
            },
            "options": {
                "graphic": {
                    "text": "Michael van Langren",
                    "fontSize": 30,
                    "textAlign": "left",
                    "fontWeight": "bold"
                }
            }
        },
        {
            "type": "Line",
            "id": "scene4-line-left",
            "zIndex": 1,
            "position": {
                "left": 165,
                "top": 0,
                "width": 10,
                "height": 450
            },
            "options": {
                "graphic": {
                    "lineWidth": 1,
                    "points": [
                        {
                            "x": 5,
                            "y": 0
                        },
                        {
                            "x": 5,
                            "y": 450
                        }
                    ]
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-line-left-decoration",
            "zIndex": 1,
            "position": {
                "left": 160,
                "top": 460,
                "width": 20,
                "height": 66
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/blocks.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-chart-image",
            "zIndex": 1,
            "position": {
                "left": 200,
                "top": 320,
                "width": 420,
                "height": 104
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/chart.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scatter",
            "zIndex": 1,
            "position": {
                "left": 200,
                "top": 320,
                "width": 500,
                "height": 120
            },
            "options": {
                "panel": {
                    "fill": "#ffffff",
                    "stroke": "black",
                    "lineWidth": 1
                },
                "spec": {
                    "type": "scatter",
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "x": 104,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 98,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 93,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 90,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 76,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 70,
                                    "y": 10,
                                    "type": "A"
                                },
                                {
                                    "x": 63,
                                    "y": 10,
                                    "type": "A"
                                }
                            ]
                        }
                    ],
                    "background": "white",
                    "xField": "x",
                    "yField": "y",
                    "seriesField": "type",
                    "point": {
                        "style": {
                            "size": 8,
                            "fill": "#E05F38"
                        }
                    },
                    "animationUpdate": {
                        "easing": "cubicInOut",
                        "duration": 1000
                    },
                    "axes": [
                        {
                            "orient": "bottom",
                            "bandPadding": 0,
                            "paddingInner": 0,
                            "paddingOuter": 0,
                            "min": 0,
                            "max": 110,
                            "type": "linear",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": false
                            },
                            "grid": {
                                "visible": false
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "black",
                                    "lineWidth": 4
                                }
                            }
                        },
                        {
                            "orient": "left",
                            "visible": false,
                            "min": 0,
                            "max": 100
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                }
            }
        },
        {
            "type": "Line",
            "id": "scene4-text-zh-line",
            "zIndex": 1,
            "position": {
                "left": 324,
                "top": 470,
                "width": 10,
                "height": 64
            },
            "options": {
                "graphic": {
                    "lineWidth": 1,
                    "points": [
                        {
                            "x": 0,
                            "y": 0
                        },
                        {
                            "x": 0,
                            "y": 64
                        }
                    ]
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-text-zh-image",
            "zIndex": 1,
            "position": {
                "left": 340,
                "top": 470,
                "width": 280,
                "height": 64
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-text-en-image",
            "zIndex": 1,
            "position": {
                "left": 660,
                "top": 600,
                "width": 300,
                "height": 54
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/text-en.png"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene4-green-rect",
            "zIndex": 1,
            "position": {
                "left": 620,
                "top": 160,
                "width": 100,
                "height": 90
            },
            "options": {
                "graphic": {
                    "fill": "rgba(124, 128,118,0.8)",
                    "background": "/vstory/assets/scene4/matrix.png",
                    "stroke": false
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-decoration",
            "zIndex": 1,
            "position": {
                "left": 740,
                "top": 340,
                "width": 80,
                "height": 120
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/decoration.png"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene4-grey-rect",
            "zIndex": 1,
            "position": {
                "left": 960,
                "top": 340,
                "width": 300,
                "height": 100
            },
            "options": {
                "graphic": {
                    "fill": "rgb(167, 160,153)",
                    "stroke": false
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-bg-decoration",
            "zIndex": 1,
            "position": {
                "left": 180,
                "top": 680,
                "width": 1200,
                "height": 140
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene4-bg-decoration",
            "zIndex": 1,
            "position": {
                "left": 180,
                "top": 680,
                "width": 1200,
                "height": 140
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene4/bg-decoration.png"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene5-background-top",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 590
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "rgb(214,216,216)"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene5-background-bottom",
            "zIndex": 0,
            "position": {
                "top": 590,
                "left": 0,
                "width": 1440,
                "height": 220
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "rgb(242,242,241)"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-title-image",
            "zIndex": 1,
            "position": {
                "top": 125,
                "left": 210,
                "width": 256,
                "height": 421
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/title-image.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-background-decoration",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 56,
                "width": 1080,
                "height": 607
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/bg-decoration.png",
                    "scale": 0.6
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-atom",
            "zIndex": 0,
            "position": {
                "top": 620,
                "left": 210,
                "width": 400,
                "height": 140
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/atom.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-zh-text",
            "zIndex": 0,
            "position": {
                "top": 406,
                "left": 520,
                "width": 200,
                "height": 90
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-en-text",
            "zIndex": 0,
            "position": {
                "top": 640,
                "left": 700,
                "width": 440,
                "height": 100
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/text-en.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene5-chart-image",
            "zIndex": 0,
            "position": {
                "top": 163,
                "left": 828,
                "width": 310,
                "height": 390
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene5/chart.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene5-chart",
            "zIndex": 0,
            "position": {
                "top": 190,
                "left": 830,
                "width": 306,
                "height": 350
            },
            "options": {
                "spec": {
                    "type": "sequence",
                    "scrollBar": {
                        "visible": false
                    },
                    "color": [
                        "#64b5fc",
                        "#ff8f62"
                    ],
                    "series": [
                        {
                            "type": "link",
                            "dataId": "dataLinkSeries",
                            "dotSeriesIndex": 1,
                            "fromField": "from",
                            "toField": "to",
                            "tooltip": {
                                "mark": {
                                    "title": {
                                        "key": "link 信息",
                                        "value": "link 信息"
                                    },
                                    "content": [
                                        {
                                            "hasShape": true,
                                            "shapeType": "square",
                                            "key": "from"
                                        },
                                        {
                                            "hasShape": true,
                                            "shapeType": "square",
                                            "key": "to"
                                        }
                                    ]
                                }
                            },
                            "arrow": {
                                "style": {
                                    "visible": false
                                }
                            },
                            "link": {
                                "style": {
                                    "stroke": "#ccc"
                                }
                            }
                        },
                        {
                            "type": "dot",
                            "dataId": "dataDotSeries",
                            "xField": "event_time",
                            "yField": "player_name",
                            "dotTypeField": "event_type",
                            "titleField": "player_name",
                            "highLightSeriesGroup": "",
                            "height": 300,
                            "clipHeight": 800,
                            "title": {
                                "style": {
                                    "fill": "rgba(46, 47, 50)"
                                }
                            },
                            "subTitle": {
                                "style": {
                                    "fill": "rgba(46, 47, 50)",
                                    "dy": 7
                                }
                            },
                            "grid": {
                                "style": {
                                    "visible": false
                                }
                            },
                            "symbol": {
                                "style": {
                                    "visible": false
                                }
                            },
                            "tooltip": {
                                "mark": {
                                    "title": {
                                        "key": "event 信息",
                                        "value": "event 信息"
                                    },
                                    "content": [
                                        {
                                            "hasShape": true,
                                            "shapeType": "square"
                                        },
                                        {
                                            "hasShape": false,
                                            "key": "event_time_stamp"
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    "axes": [
                        {
                            "orient": "top",
                            "type": "time",
                            "range": {
                                "min": -2209017943000,
                                "max": -2209015063000
                            },
                            "layers": [
                                {
                                    "tickStep": 28800,
                                    "timeFormat": "%Y%m%d"
                                },
                                {
                                    "tickStep": 28800,
                                    "timeFormat": "%H:%M"
                                }
                            ],
                            "label": {
                                "visible": false
                            }
                        }
                    ],
                    "data": [
                        {
                            "id": "dataDotSeries",
                            "values": [
                                {
                                    "player_name": "Deandre Ayton",
                                    "type": "Deandre Ayton",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Deandre Ayton_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Deandre Ayton_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Deandre Ayton_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Deandre Ayton_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015551000,
                                            "node_name": "Deandre Ayton_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015127000,
                                            "node_name": "Deandre Ayton_2_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015116000,
                                            "node_name": "Deandre Ayton_3_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Deandre Ayton_3_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Devin Booker",
                                    "type": "Devin Booker",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Devin Booker_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017293000,
                                            "node_name": "Devin Booker_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Devin Booker_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015783000,
                                            "node_name": "Devin Booker_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015380000,
                                            "node_name": "Devin Booker_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Devin Booker_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Kyle Lowry",
                                    "type": "Kyle Lowry",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Kyle Lowry_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Kyle Lowry_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209017223000,
                                            "node_name": "Kyle Lowry_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016762000,
                                            "node_name": "Kyle Lowry_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016614000,
                                            "node_name": "Kyle Lowry_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Kyle Lowry_2_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015884000,
                                            "node_name": "Kyle Lowry_3_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Kyle Lowry_3_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Jae Crowder",
                                    "type": "Jae Crowder",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Jae Crowder_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017293000,
                                            "node_name": "Jae Crowder_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Jae Crowder_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016139000,
                                            "node_name": "Jae Crowder_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015651000,
                                            "node_name": "Jae Crowder_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Jae Crowder_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Aron Baynes",
                                    "type": "Aron Baynes",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Aron Baynes_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Aron Baynes_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016503000,
                                            "node_name": "Aron Baynes_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016166000,
                                            "node_name": "Aron Baynes_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Pascal Siakam",
                                    "type": "Pascal Siakam",
                                    "dots": [
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Pascal Siakam_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015788000,
                                            "node_name": "Pascal Siakam_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015528000,
                                            "node_name": "Pascal Siakam_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Pascal Siakam_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Pascal Siakam_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017223000,
                                            "node_name": "Pascal Siakam_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Mikal Bridges",
                                    "type": "Mikal Bridges",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Mikal Bridges_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017650000,
                                            "node_name": "Mikal Bridges_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Mikal Bridges_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016762000,
                                            "node_name": "Mikal Bridges_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016503000,
                                            "node_name": "Mikal Bridges_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016003000,
                                            "node_name": "Mikal Bridges_2_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015783000,
                                            "node_name": "Mikal Bridges_3_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Mikal Bridges_3_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Chris Paul",
                                    "type": "Chris Paul",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Chris Paul_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Chris Paul_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Chris Paul_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Chris Paul_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015551000,
                                            "node_name": "Chris Paul_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Chris Paul_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "OG Anunoby",
                                    "type": "OG Anunoby",
                                    "dots": [
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "OG Anunoby_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "OG Anunoby_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209017223000,
                                            "node_name": "OG Anunoby_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016614000,
                                            "node_name": "OG Anunoby_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016503000,
                                            "node_name": "OG Anunoby_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016021000,
                                            "node_name": "OG Anunoby_2_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015788000,
                                            "node_name": "OG Anunoby_3_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "OG Anunoby_3_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Fred VanVleet",
                                    "type": "Fred VanVleet",
                                    "dots": [
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Fred VanVleet_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015884000,
                                            "node_name": "Fred VanVleet_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015651000,
                                            "node_name": "Fred VanVleet_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Fred VanVleet_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209017943000,
                                            "node_name": "Fred VanVleet_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017223000,
                                            "node_name": "Fred VanVleet_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Cameron Johnson",
                                    "type": "Cameron Johnson",
                                    "dots": [
                                        {
                                            "event_time": -2209017650000,
                                            "node_name": "Cameron Johnson_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Cameron Johnson_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016762000,
                                            "node_name": "Cameron Johnson_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016503000,
                                            "node_name": "Cameron Johnson_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016139000,
                                            "node_name": "Cameron Johnson_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015651000,
                                            "node_name": "Cameron Johnson_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Yuta Watanabe",
                                    "type": "Yuta Watanabe",
                                    "dots": [
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Yuta Watanabe_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Yuta Watanabe_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016021000,
                                            "node_name": "Yuta Watanabe_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015651000,
                                            "node_name": "Yuta Watanabe_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Dario Saric",
                                    "type": "Dario Saric",
                                    "dots": [
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Dario Saric_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Dario Saric_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Dario Saric_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015551000,
                                            "node_name": "Dario Saric_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015127000,
                                            "node_name": "Dario Saric_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015116000,
                                            "node_name": "Dario Saric_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Chris Boucher",
                                    "type": "Chris Boucher",
                                    "dots": [
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Chris Boucher_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Chris Boucher_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209015962000,
                                            "node_name": "Chris Boucher_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015528000,
                                            "node_name": "Chris Boucher_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Norman Powell",
                                    "type": "Norman Powell",
                                    "dots": [
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Norman Powell_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209017119000,
                                            "node_name": "Norman Powell_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016762000,
                                            "node_name": "Norman Powell_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016547000,
                                            "node_name": "Norman Powell_1_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Norman Powell_2_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015063000,
                                            "node_name": "Norman Powell_2_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Cameron Payne",
                                    "type": "Cameron Payne",
                                    "dots": [
                                        {
                                            "event_time": -2209017476000,
                                            "node_name": "Cameron Payne_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Cameron Payne_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016057000,
                                            "node_name": "Cameron Payne_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015551000,
                                            "node_name": "Cameron Payne_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Langston Galloway",
                                    "type": "Langston Galloway",
                                    "dots": [
                                        {
                                            "event_time": -2209017293000,
                                            "node_name": "Langston Galloway_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Langston Galloway_0_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Jevon Carter",
                                    "type": "Jevon Carter",
                                    "dots": [
                                        {
                                            "event_time": -2209017293000,
                                            "node_name": "Jevon Carter_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Jevon Carter_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016003000,
                                            "node_name": "Jevon Carter_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015380000,
                                            "node_name": "Jevon Carter_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Malachi Flynn",
                                    "type": "Malachi Flynn",
                                    "dots": [
                                        {
                                            "event_time": -2209017119000,
                                            "node_name": "Malachi Flynn_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016892000,
                                            "node_name": "Malachi Flynn_0_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "Alex Len",
                                    "type": "Alex Len",
                                    "dots": [
                                        {
                                            "event_time": -2209016998000,
                                            "node_name": "Alex Len_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209016503000,
                                            "node_name": "Alex Len_0_end_node",
                                            "event_type": "end"
                                        },
                                        {
                                            "event_time": -2209016166000,
                                            "node_name": "Alex Len_1_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015962000,
                                            "node_name": "Alex Len_1_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                },
                                {
                                    "player_name": "DeAndre' Bembry",
                                    "type": "DeAndre' Bembry",
                                    "dots": [
                                        {
                                            "event_time": -2209016547000,
                                            "node_name": "DeAndre' Bembry_0_start_node",
                                            "event_type": "start"
                                        },
                                        {
                                            "event_time": -2209015783000,
                                            "node_name": "DeAndre' Bembry_0_end_node",
                                            "event_type": "end"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "dataLinkSeries",
                            "values": [
                                {
                                    "pos": "Deandre Ayton_0_start_node",
                                    "to": "Deandre Ayton_0_end_node"
                                },
                                {
                                    "pos": "Deandre Ayton_1_start_node",
                                    "to": "Deandre Ayton_1_end_node"
                                },
                                {
                                    "pos": "Deandre Ayton_2_start_node",
                                    "to": "Deandre Ayton_2_end_node"
                                },
                                {
                                    "pos": "Deandre Ayton_3_start_node",
                                    "to": "Deandre Ayton_3_end_node"
                                },
                                {
                                    "pos": "Devin Booker_0_start_node",
                                    "to": "Devin Booker_0_end_node"
                                },
                                {
                                    "pos": "Devin Booker_1_start_node",
                                    "to": "Devin Booker_1_end_node"
                                },
                                {
                                    "pos": "Devin Booker_2_start_node",
                                    "to": "Devin Booker_2_end_node"
                                },
                                {
                                    "pos": "Kyle Lowry_0_start_node",
                                    "to": "Kyle Lowry_0_end_node"
                                },
                                {
                                    "pos": "Kyle Lowry_1_start_node",
                                    "to": "Kyle Lowry_1_end_node"
                                },
                                {
                                    "pos": "Kyle Lowry_2_start_node",
                                    "to": "Kyle Lowry_2_end_node"
                                },
                                {
                                    "pos": "Kyle Lowry_3_start_node",
                                    "to": "Kyle Lowry_3_end_node"
                                },
                                {
                                    "pos": "Jae Crowder_0_start_node",
                                    "to": "Jae Crowder_0_end_node"
                                },
                                {
                                    "pos": "Jae Crowder_1_start_node",
                                    "to": "Jae Crowder_1_end_node"
                                },
                                {
                                    "pos": "Jae Crowder_2_start_node",
                                    "to": "Jae Crowder_2_end_node"
                                },
                                {
                                    "pos": "Aron Baynes_0_start_node",
                                    "to": "Aron Baynes_0_end_node"
                                },
                                {
                                    "pos": "Aron Baynes_1_start_node",
                                    "to": "Aron Baynes_1_end_node"
                                },
                                {
                                    "pos": "Pascal Siakam_0_start_node",
                                    "to": "Pascal Siakam_0_end_node"
                                },
                                {
                                    "pos": "Pascal Siakam_1_start_node",
                                    "to": "Pascal Siakam_1_end_node"
                                },
                                {
                                    "pos": "Pascal Siakam_2_start_node",
                                    "to": "Pascal Siakam_2_end_node"
                                },
                                {
                                    "pos": "Mikal Bridges_0_start_node",
                                    "to": "Mikal Bridges_0_end_node"
                                },
                                {
                                    "pos": "Mikal Bridges_1_start_node",
                                    "to": "Mikal Bridges_1_end_node"
                                },
                                {
                                    "pos": "Mikal Bridges_2_start_node",
                                    "to": "Mikal Bridges_2_end_node"
                                },
                                {
                                    "pos": "Mikal Bridges_3_start_node",
                                    "to": "Mikal Bridges_3_end_node"
                                },
                                {
                                    "pos": "Chris Paul_0_start_node",
                                    "to": "Chris Paul_0_end_node"
                                },
                                {
                                    "pos": "Chris Paul_1_start_node",
                                    "to": "Chris Paul_1_end_node"
                                },
                                {
                                    "pos": "Chris Paul_2_start_node",
                                    "to": "Chris Paul_2_end_node"
                                },
                                {
                                    "pos": "OG Anunoby_0_start_node",
                                    "to": "OG Anunoby_0_end_node"
                                },
                                {
                                    "pos": "OG Anunoby_1_start_node",
                                    "to": "OG Anunoby_1_end_node"
                                },
                                {
                                    "pos": "OG Anunoby_2_start_node",
                                    "to": "OG Anunoby_2_end_node"
                                },
                                {
                                    "pos": "OG Anunoby_3_start_node",
                                    "to": "OG Anunoby_3_end_node"
                                },
                                {
                                    "pos": "Fred VanVleet_0_start_node",
                                    "to": "Fred VanVleet_0_end_node"
                                },
                                {
                                    "pos": "Fred VanVleet_1_start_node",
                                    "to": "Fred VanVleet_1_end_node"
                                },
                                {
                                    "pos": "Fred VanVleet_2_start_node",
                                    "to": "Fred VanVleet_2_end_node"
                                },
                                {
                                    "pos": "Cameron Johnson_0_start_node",
                                    "to": "Cameron Johnson_0_end_node"
                                },
                                {
                                    "pos": "Cameron Johnson_1_start_node",
                                    "to": "Cameron Johnson_1_end_node"
                                },
                                {
                                    "pos": "Cameron Johnson_2_start_node",
                                    "to": "Cameron Johnson_2_end_node"
                                },
                                {
                                    "pos": "Yuta Watanabe_0_start_node",
                                    "to": "Yuta Watanabe_0_end_node"
                                },
                                {
                                    "pos": "Yuta Watanabe_1_start_node",
                                    "to": "Yuta Watanabe_1_end_node"
                                },
                                {
                                    "pos": "Dario Saric_0_start_node",
                                    "to": "Dario Saric_0_end_node"
                                },
                                {
                                    "pos": "Dario Saric_1_start_node",
                                    "to": "Dario Saric_1_end_node"
                                },
                                {
                                    "pos": "Dario Saric_2_start_node",
                                    "to": "Dario Saric_2_end_node"
                                },
                                {
                                    "pos": "Chris Boucher_0_start_node",
                                    "to": "Chris Boucher_0_end_node"
                                },
                                {
                                    "pos": "Chris Boucher_1_start_node",
                                    "to": "Chris Boucher_1_end_node"
                                },
                                {
                                    "pos": "Norman Powell_0_start_node",
                                    "to": "Norman Powell_0_end_node"
                                },
                                {
                                    "pos": "Norman Powell_1_start_node",
                                    "to": "Norman Powell_1_end_node"
                                },
                                {
                                    "pos": "Norman Powell_2_start_node",
                                    "to": "Norman Powell_2_end_node"
                                },
                                {
                                    "pos": "Cameron Payne_0_start_node",
                                    "to": "Cameron Payne_0_end_node"
                                },
                                {
                                    "pos": "Cameron Payne_1_start_node",
                                    "to": "Cameron Payne_1_end_node"
                                },
                                {
                                    "pos": "Langston Galloway_0_start_node",
                                    "to": "Langston Galloway_0_end_node"
                                },
                                {
                                    "pos": "Jevon Carter_0_start_node",
                                    "to": "Jevon Carter_0_end_node"
                                },
                                {
                                    "pos": "Jevon Carter_1_start_node",
                                    "to": "Jevon Carter_1_end_node"
                                },
                                {
                                    "pos": "Malachi Flynn_0_start_node",
                                    "to": "Malachi Flynn_0_end_node"
                                },
                                {
                                    "pos": "Alex Len_0_start_node",
                                    "to": "Alex Len_0_end_node"
                                },
                                {
                                    "pos": "Alex Len_1_start_node",
                                    "to": "Alex Len_1_end_node"
                                },
                                {
                                    "pos": "DeAndre' Bembry_0_start_node",
                                    "to": "DeAndre' Bembry_0_end_node"
                                }
                            ]
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "white"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene6-bg1",
            "zIndex": 1,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#CDC6BA"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene6-bg2",
            "zIndex": -1,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#DBDBDB"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene6-bg-bottom",
            "zIndex": 1,
            "position": {
                "top": 662,
                "left": 90,
                "width": 1262,
                "height": 148
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "rgb(30,34,33)"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene6-bg-top",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 90,
                "width": 1262,
                "height": 68
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "rgb(195,195,195)"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene6-img1",
            "zIndex": 1,
            "position": {
                "top": 160,
                "left": 251.99999999999997,
                "width": 936,
                "height": 442
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene6/main-image.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene6-img2",
            "zIndex": 1,
            "position": {
                "top": 0,
                "left": 90,
                "width": 1262,
                "height": 876
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene6/main-image2.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene6-img3",
            "zIndex": 1,
            "position": {
                "top": 240,
                "left": 90,
                "width": 533.25,
                "height": 427.5
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene6/chart.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene6-img4",
            "zIndex": 1,
            "position": {
                "top": 300,
                "left": 750,
                "width": 389,
                "height": 275.5
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene6/text.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene6-chart",
            "zIndex": 1,
            "position": {
                "top": 232,
                "left": 728,
                "width": 458,
                "height": 308
            },
            "options": {
                "spec": {
                    "type": "bar",
                    "padding": 0,
                    "data": [
                        {
                            "id": "dataId",
                            "values": []
                        }
                    ],
                    "direction": "horizontal",
                    "yField": "country",
                    "xField": "max",
                    "seriesField": "continent",
                    "color": [
                        "#008584",
                        "#F2993D"
                    ],
                    "legends": {
                        "orient": "bottom",
                        "layoutType": "absolute",
                        "bottom": 20,
                        "right": 115
                    },
                    "axes": [
                        {
                            "animation": true,
                            "orient": "bottom",
                            "type": "linear",
                            "visible": true,
                            "grid": {
                                "visible": true
                            },
                            "label": {
                                "style": {
                                    "fontSize": 12
                                }
                            },
                            "max": 650
                        },
                        {
                            "animation": true,
                            "id": "axis-left",
                            "orient": "left",
                            "tick": {
                                "visible": false
                            },
                            "label": {
                                "visible": true,
                                "style": {
                                    "fontSize": 12
                                }
                            },
                            "type": "band",
                            "grid": {
                                "visible": false
                            }
                        }
                    ],
                    "animationAppear": false,
                    "animationUpdate": {
                        "bar": {
                            "duration": 500,
                            "easing": "linear"
                        },
                        "axis": {
                            "duration": 400,
                            "easing": "linear"
                        }
                    },
                    "bar": {
                        "style": {
                            "fill": {
                                "gradient": "linear",
                                "stops": [
                                    {
                                        "offset": 1
                                    },
                                    {
                                        "offset": 0,
                                        "opacity": 0.6
                                    }
                                ]
                            }
                        }
                    },
                    "background": "rgba(205, 198, 186,0.5)",
                    "animation": true
                },
                "panel": {
                    "fill": "#ffffff"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene6-range-chart",
            "zIndex": 2,
            "position": {
                "top": 280,
                "left": 108,
                "width": 496,
                "height": 303
            },
            "options": {
                "spec": {
                    "type": "common",
                    "data": [
                        {
                            "id": "areaData",
                            "values": [
                                {
                                    "year": 1700,
                                    "exports": 35,
                                    "imports": 70
                                },
                                {
                                    "year": 1710,
                                    "exports": 59,
                                    "imports": 81
                                },
                                {
                                    "year": 1720,
                                    "exports": 76,
                                    "imports": 96
                                },
                                {
                                    "year": 1730,
                                    "exports": 65,
                                    "imports": 97
                                },
                                {
                                    "year": 1740,
                                    "exports": 67,
                                    "imports": 93
                                },
                                {
                                    "year": 1750,
                                    "exports": 79,
                                    "imports": 90
                                },
                                {
                                    "year": 1753,
                                    "exports": 87,
                                    "imports": 87
                                },
                                {
                                    "year": 1760,
                                    "exports": 115,
                                    "imports": 79
                                },
                                {
                                    "year": 1770,
                                    "exports": 163,
                                    "imports": 85
                                },
                                {
                                    "year": 1780,
                                    "exports": 185,
                                    "imports": 93
                                }
                            ]
                        }
                    ],
                    "series": [
                        {
                            "type": "rangeArea",
                            "xField": "year",
                            "yField": [
                                "exports",
                                "imports"
                            ],
                            "area": {
                                "style": {
                                    "curveType": "monotone"
                                }
                            }
                        },
                        {
                            "type": "line",
                            "xField": "year",
                            "yField": "exports",
                            "point": {
                                "style": {
                                    "size": 0
                                }
                            },
                            "line": {
                                "style": {
                                    "curveType": "monotone",
                                    "stroke": "#F5222D"
                                }
                            }
                        },
                        {
                            "type": "line",
                            "xField": "year",
                            "yField": "imports",
                            "point": {
                                "style": {
                                    "size": 0
                                }
                            },
                            "line": {
                                "style": {
                                    "curveType": "monotone",
                                    "stroke": "#FAAD14"
                                }
                            }
                        }
                    ],
                    "markPoint": [
                        {
                            "coordinate": {
                                "year": 1730,
                                "exports": 50
                            },
                            "itemContent": {
                                "type": "text",
                                "autoRotate": false,
                                "text": {
                                    "text": "BALANCE AGAINST",
                                    "style": {
                                        "fontSize": 14,
                                        "fontWeight": "bold",
                                        "fill": "rgba(0,0,0,0.45)",
                                        "textAlign": "center",
                                        "textBaseline": "middle"
                                    }
                                }
                            },
                            "itemLine": {
                                "visible": false
                            }
                        },
                        {
                            "coordinate": {
                                "year": 1765,
                                "exports": 75
                            },
                            "itemContent": {
                                "offsetX": -40,
                                "type": "text",
                                "autoRotate": false,
                                "text": {
                                    "text": [
                                        "BALANCE in",
                                        "FAVOUR of ENGLAND"
                                    ],
                                    "style": {
                                        "fontSize": 14,
                                        "fontWeight": "bold",
                                        "fill": "rgba(0,0,0,0.45)",
                                        "textAlign": "left",
                                        "textBaseline": "middle"
                                    }
                                }
                            },
                            "itemLine": {
                                "visible": false
                            }
                        }
                    ],
                    "axes": [
                        {
                            "orient": "left",
                            "label": {
                                "visible": true
                            },
                            "type": "linear"
                        },
                        {
                            "orient": "bottom",
                            "type": "linear",
                            "min": "1700",
                            "max": "1780"
                        }
                    ],
                    "crosshair": {
                        "xField": {
                            "line": {
                                "type": "line"
                            },
                            "label": {
                                "visible": true
                            }
                        }
                    },
                    "padding": 0,
                    "animationAppear": false,
                    "animation": true
                },
                "panel": {
                    "fill": "#ffffff"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene7-background-top",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 68
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "scaleX": 0.8,
                    "fill": "rgb(195,195,195)"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene7-background-middle",
            "zIndex": 0,
            "position": {
                "top": 66,
                "left": 0,
                "width": 1440,
                "height": 596
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "scaleX": 0.8,
                    "fill": "rgb(221,221,221)"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene7-background-bottom",
            "zIndex": 0,
            "position": {
                "top": 662,
                "left": 0,
                "width": 1440,
                "height": 148
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "scaleX": 0.8,
                    "fill": "rgb(30,34,33)"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene7-zh-text",
            "zIndex": 0,
            "position": {
                "top": 416,
                "left": 167,
                "width": 248,
                "height": 142
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene7/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene7-title",
            "zIndex": 0,
            "position": {
                "top": 75,
                "left": 150,
                "width": 675,
                "height": 390
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene7/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene7-chart-image",
            "zIndex": 0,
            "position": {
                "top": 180,
                "left": 534,
                "width": 548,
                "height": 336
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene7/chart.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene7-en-text",
            "zIndex": 0,
            "position": {
                "top": 178,
                "left": 1105,
                "width": 276,
                "height": 158
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene7/text-en.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene7-pie-image",
            "zIndex": 0,
            "position": {
                "top": 484,
                "left": 1136,
                "width": 248,
                "height": 248
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene7/pie.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene7-chart",
            "zIndex": 0,
            "position": {
                "top": 208,
                "left": 534,
                "width": 548,
                "height": 278
            },
            "options": {
                "spec": {
                    "type": "pie",
                    "dataIndex": 0,
                    "outerRadius": 0.75,
                    "innerRadius": 0,
                    "valueField": "value",
                    "categoryField": "type",
                    "color": [
                        "#56826C",
                        "#BF6970",
                        "#CDA871",
                        "#B4948F",
                        "#a05d56",
                        "#CC6691",
                        "#EBA4C2"
                    ],
                    "background": "transparent",
                    "data": {
                        "values": [
                            {
                                "type": "0~9",
                                "value": "39.12"
                            },
                            {
                                "type": "10~19",
                                "value": "43.01"
                            },
                            {
                                "type": "20~29",
                                "value": "43.91"
                            },
                            {
                                "type": "30~39",
                                "value": "45.4"
                            },
                            {
                                "type": "40~49",
                                "value": "40.89"
                            },
                            {
                                "type": "50~59",
                                "value": "42.48"
                            },
                            {
                                "type": "60~69",
                                "value": "39.63"
                            },
                            {
                                "type": "70~79",
                                "value": "25.17"
                            },
                            {
                                "type": "80 and over",
                                "value": "12.29"
                            }
                        ]
                    },
                    "label": {
                        "visible": true
                    },
                    "pie": {
                        "style": {
                            "stroke": "rgb(238,231,217)",
                            "lineWidth": 1
                        }
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "rgb(238,231,217)",
                    "stroke": "black",
                    "lineWidth": 1
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene8-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "rgb(34,34,34)"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-bg-decoration",
            "zIndex": 0,
            "position": {
                "top": 80,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-title",
            "zIndex": 0,
            "position": {
                "top": 156,
                "left": 126,
                "width": 426,
                "height": 144
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-text",
            "zIndex": 0,
            "position": {
                "top": 472,
                "left": 128,
                "width": 336,
                "height": 248
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/text.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-chart-image",
            "zIndex": 0,
            "position": {
                "top": 190,
                "left": 882,
                "width": 373,
                "height": 337
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/chart.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-image1",
            "zIndex": 0,
            "position": {
                "top": 358,
                "left": 590,
                "width": 280,
                "height": 453
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/image1.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene8-image2",
            "zIndex": 0,
            "position": {
                "top": 514,
                "left": 1066,
                "width": 190,
                "height": 226
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene8/image2.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene8-chart",
            "zIndex": 0,
            "position": {
                "top": 210,
                "left": 890,
                "width": 360,
                "height": 290
            },
            "options": {
                "spec": {
                    "type": "scatter",
                    "padding": {
                        "left": 6,
                        "right": 30
                    },
                    "xField": "year",
                    "yField": "value",
                    "tooltip": {
                        "dimension": {
                            "visible": false
                        },
                        "mark": {
                            "visible": false
                        }
                    },
                    "crosshair": {
                        "yField": {
                            "visible": false
                        },
                        "xField": {
                            "visible": false
                        }
                    },
                    "point": {
                        "style": {
                            "fill": "black",
                            "size": 4
                        }
                    },
                    "axes": [
                        {
                            "title": {
                                "visible": true,
                                "text": "Poisition Angle(deg.)",
                                "style": {
                                    "fill": "black",
                                    "fontSize": 8
                                }
                            },
                            "orient": "left",
                            "min": 80,
                            "max": 170,
                            "niceType": "accurateFirst",
                            "tick": {
                                "visible": true,
                                "forceTickCount": 10,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "subTick": {
                                "visible": true,
                                "tickCount": 5,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "label": {
                                "visible": true,
                                "style": {
                                    "fill": "black",
                                    "fontSize": 8
                                }
                            },
                            "grid": {
                                "visible": false
                            },
                            "type": "linear"
                        },
                        {
                            "title": {
                                "visible": true,
                                "text": "Year",
                                "style": {
                                    "fill": "black",
                                    "fontSize": 8
                                }
                            },
                            "orient": "bottom",
                            "label": {
                                "visible": true,
                                "style": {
                                    "fill": "black",
                                    "fontSize": 8
                                }
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "tick": {
                                "visible": true,
                                "forceTickCount": 14,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "subTick": {
                                "visible": true,
                                "tickCount": 1,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "grid": {
                                "visible": false
                            },
                            "type": "linear",
                            "min": 1710,
                            "max": 1840,
                            "step": 10
                        },
                        {
                            "orient": "top",
                            "label": {
                                "visible": false,
                                "style": {
                                    "fill": "black"
                                }
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "tick": {
                                "visible": false,
                                "forceTickCount": 14,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "subTick": {
                                "visible": false,
                                "tickCount": 1,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "grid": {
                                "visible": false
                            },
                            "type": "linear",
                            "min": 1710,
                            "max": 1840,
                            "step": 10
                        },
                        {
                            "orient": "right",
                            "label": {
                                "visible": false,
                                "style": {
                                    "fill": "black"
                                }
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "tick": {
                                "visible": false,
                                "forceTickCount": 14,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "subTick": {
                                "visible": false,
                                "tickCount": 1,
                                "style": {
                                    "stroke": "black"
                                }
                            },
                            "grid": {
                                "visible": false
                            },
                            "type": "linear",
                            "min": 80,
                            "max": 170
                        }
                    ],
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "year": 1718,
                                    "value": 139
                                },
                                {
                                    "year": 1720,
                                    "value": 162,
                                    "border": true
                                },
                                {
                                    "year": 1756,
                                    "value": 146,
                                    "border": true
                                },
                                {
                                    "year": 1782,
                                    "value": 132,
                                    "border": true
                                },
                                {
                                    "year": 1803,
                                    "value": 120,
                                    "border": true
                                },
                                {
                                    "year": 1820,
                                    "value": 105,
                                    "border": true
                                },
                                {
                                    "year": 1822,
                                    "value": 102,
                                    "border": true
                                },
                                {
                                    "year": 1822.5,
                                    "value": 101,
                                    "border": true
                                },
                                {
                                    "year": 1825,
                                    "value": 97,
                                    "border": true
                                },
                                {
                                    "year": 1825.5,
                                    "value": 96,
                                    "border": true
                                },
                                {
                                    "year": 1830,
                                    "value": 82,
                                    "border": true
                                }
                            ]
                        }
                    ],
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "white"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene9-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#CFC9BE"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-bg-decoration",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1240,
                "height": 496
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-person",
            "zIndex": 1,
            "position": {
                "top": 218,
                "left": 864,
                "width": 396,
                "height": 592
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/person.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-chart-image",
            "zIndex": 0,
            "position": {
                "top": 196,
                "left": 454,
                "width": 800,
                "height": 612
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/chart.png",
                    "fillOpacity": 0.9
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-title",
            "zIndex": 0,
            "position": {
                "top": 140,
                "left": 160,
                "width": 285,
                "height": 105
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-text-zh",
            "zIndex": 0,
            "position": {
                "top": 500,
                "left": 165,
                "width": 270,
                "height": 86
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene9-text-en",
            "zIndex": 0,
            "position": {
                "top": 610,
                "left": 165,
                "width": 260,
                "height": 120
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene9/text-en.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene9-rose-chart",
            "zIndex": 2,
            "position": {
                "top": 376,
                "left": 470,
                "width": 240,
                "height": 240
            },
            "options": {
                "spec": {
                    "type": "rose",
                    "data": [
                        {
                            "id": "1856Rose",
                            "values": [],
                            "fields": {
                                "month": {
                                    "lockStatisticsByDomain": true,
                                    "domain": [
                                        "Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Aug",
                                        "Sep",
                                        "Oct",
                                        "Nov",
                                        "Dec"
                                    ]
                                }
                            }
                        }
                    ],
                    "color": [
                        "#595959",
                        "#94786A",
                        "#709394"
                    ],
                    "padding": 5,
                    "radius": 0.7,
                    "innerRadius": 0,
                    "categoryField": "month",
                    "valueField": "value",
                    "seriesField": "type",
                    "stack": true,
                    "rose": {
                        "style": {
                            "stroke": "white",
                            "lineWidth": 1
                        }
                    },
                    "animationAppear": false,
                    "animationEnter": {
                        "rose": {
                            "type": "growRadiusIn",
                            "options": {
                                "overall": true
                            },
                            "duration": 200,
                            "easing": "bounceOut"
                        }
                    },
                    "legends": {
                        "visible": false,
                        "orient": "top",
                        "interactive": false
                    },
                    "axes": [
                        {
                            "orient": "radius",
                            "visible": true,
                            "tick": {
                                "tickCount": 3
                            },
                            "grid": {
                                "visible": true,
                                "style": {
                                    "lineDash": [
                                        0
                                    ]
                                }
                            },
                            "max": 150
                        },
                        {
                            "orient": "angle",
                            "visible": true,
                            "domain": [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec"
                            ],
                            "domainLine": {
                                "visible": true,
                                "smooth": false
                            },
                            "grid": {
                                "visible": true,
                                "smooth": false
                            },
                            "label": {
                                "visible": true,
                                "style": {
                                    "fill": "#000"
                                }
                            }
                        }
                    ],
                    "animation": true
                },
                "panel": {
                    "fill": "#C7B9AF"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene10-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#2E4254"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-person",
            "zIndex": 1,
            "position": {
                "top": 246,
                "left": 844,
                "width": 445,
                "height": 564
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/person.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-title",
            "zIndex": 1,
            "position": {
                "top": 160,
                "left": 192,
                "width": 334,
                "height": 100
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-bg-decoration",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1340,
                "height": 494
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-text-zh",
            "zIndex": 0,
            "position": {
                "top": 462,
                "left": 190,
                "width": 240,
                "height": 96
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-text-en",
            "zIndex": 0,
            "position": {
                "top": 344,
                "left": 526,
                "width": 272,
                "height": 80
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/text-en.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene10-chart-image",
            "zIndex": 0,
            "position": {
                "top": 472,
                "left": 526,
                "width": 320,
                "height": 338
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene10/chart.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene10-radar-chart",
            "zIndex": 3,
            "position": {
                "top": 494,
                "left": 526,
                "width": 320,
                "height": 320
            },
            "options": {
                "spec": {
                    "type": "radar",
                    "background": "transparent",
                    "data": [
                        {
                            "values": [
                                {
                                    "month": "1月",
                                    "value": 94.49319300510174,
                                    "type": "A"
                                },
                                {
                                    "month": "2月",
                                    "value": 61.14092372972942,
                                    "type": "A"
                                },
                                {
                                    "month": "3月",
                                    "value": 94.16102592985493,
                                    "type": "A"
                                },
                                {
                                    "month": "4月",
                                    "value": 13.082338836306398,
                                    "type": "A"
                                },
                                {
                                    "month": "5月",
                                    "value": 12.909300843933483,
                                    "type": "A"
                                },
                                {
                                    "month": "6月",
                                    "value": 83.98068597346013,
                                    "type": "A"
                                },
                                {
                                    "month": "7月",
                                    "value": 83.22778708323052,
                                    "type": "A"
                                },
                                {
                                    "month": "8月",
                                    "value": 49.327876396511805,
                                    "type": "A"
                                },
                                {
                                    "month": "9月",
                                    "value": 34.020694319397464,
                                    "type": "A"
                                },
                                {
                                    "month": "10月",
                                    "value": 54.62117161185382,
                                    "type": "A"
                                },
                                {
                                    "month": "11月",
                                    "value": 67.41282541983676,
                                    "type": "A"
                                },
                                {
                                    "month": "12月",
                                    "value": 31.348712891557398,
                                    "type": "A"
                                },
                                {
                                    "month": "1月",
                                    "value": 70.61063108292919,
                                    "type": "B"
                                },
                                {
                                    "month": "2月",
                                    "value": 98.1972825282799,
                                    "type": "B"
                                },
                                {
                                    "month": "3月",
                                    "value": 12.626162597170856,
                                    "type": "B"
                                },
                                {
                                    "month": "4月",
                                    "value": 16.826233399667238,
                                    "type": "B"
                                },
                                {
                                    "month": "5月",
                                    "value": 105.67385777707868,
                                    "type": "B"
                                },
                                {
                                    "month": "6月",
                                    "value": 75.88857533529068,
                                    "type": "B"
                                },
                                {
                                    "month": "7月",
                                    "value": 35.95071933161776,
                                    "type": "B"
                                },
                                {
                                    "month": "8月",
                                    "value": 59.625975908060816,
                                    "type": "B"
                                },
                                {
                                    "month": "9月",
                                    "value": 50.158025718137246,
                                    "type": "B"
                                },
                                {
                                    "month": "10月",
                                    "value": 100.20594354556593,
                                    "type": "B"
                                },
                                {
                                    "month": "11月",
                                    "value": 33.601195043679084,
                                    "type": "B"
                                },
                                {
                                    "month": "12月",
                                    "value": 42.94796416861403,
                                    "type": "B"
                                }
                            ]
                        }
                    ],
                    "categoryField": "month",
                    "valueField": "value",
                    "seriesField": "type",
                    "outerRadius": 0.8,
                    "color": [
                        "#27711B",
                        "#A64260"
                    ],
                    "area": {
                        "visible": true
                    },
                    "line": {
                        "style": {
                            "lineWidth": 1
                        }
                    },
                    "axes": [
                        {
                            "orient": "radius",
                            "grid": {
                                "smooth": true,
                                "style": {
                                    "lineDash": [
                                        0
                                    ]
                                },
                                "alternateColor": "rgba(255, 255, 255, 0.2)"
                            }
                        },
                        {
                            "orient": "angle",
                            "tick": {
                                "visible": false
                            },
                            "domainLine": {
                                "visible": true,
                                "style": {
                                    "stroke": "#333"
                                }
                            },
                            "grid": {
                                "style": {
                                    "lineDash": [
                                        0
                                    ]
                                }
                            },
                            "label": {
                                "style": {
                                    "fill": "#ffffff"
                                }
                            }
                        }
                    ],
                    "legends": {
                        "visible": false,
                        "orient": "top"
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "#C6B0B7"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene11-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#FAFAFA"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene11-bg-decoration",
            "zIndex": 0,
            "position": {
                "top": 180,
                "left": 170,
                "width": 1125,
                "height": 562
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene11/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene11-title",
            "zIndex": 0,
            "position": {
                "top": 158,
                "left": 766,
                "width": 516,
                "height": 168
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene11/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene11-text-en",
            "zIndex": 0,
            "position": {
                "top": 394,
                "left": 842,
                "width": 440,
                "height": 110
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene11/text-en.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene11-text-zh",
            "zIndex": 0,
            "position": {
                "top": 595,
                "left": 156,
                "width": 270,
                "height": 117
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene11/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene11-chart-image",
            "zIndex": 0,
            "position": {
                "top": 150,
                "left": 156,
                "width": 450,
                "height": 269
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene11/chart.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene11-wordcloud-chart",
            "zIndex": 0,
            "position": {
                "top": 150,
                "left": 156,
                "width": 450,
                "height": 269
            },
            "options": {
                "panel": {
                    "fill": "#eeeeee"
                },
                "spec": {
                    "background": "transparent",
                    "type": "wordCloud",
                    "maskShape": "https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/log.jpeg",
                    "nameField": "challenge_name",
                    "valueField": "sum_count",
                    "seriesField": "challenge_name",
                    "padding": 0,
                    "data": [
                        {
                            "name": "data",
                            "values": [
                                {
                                    "challenge_name": "刘浩存",
                                    "sum_count": 957
                                },
                                {
                                    "challenge_name": "刘昊然",
                                    "sum_count": 942
                                },
                                {
                                    "challenge_name": "喜欢",
                                    "sum_count": 842
                                },
                                {
                                    "challenge_name": "真的",
                                    "sum_count": 828
                                },
                                {
                                    "challenge_name": "四海",
                                    "sum_count": 665
                                },
                                {
                                    "challenge_name": "好看",
                                    "sum_count": 627
                                },
                                {
                                    "challenge_name": "评论",
                                    "sum_count": 574
                                },
                                {
                                    "challenge_name": "好像",
                                    "sum_count": 564
                                },
                                {
                                    "challenge_name": "沈腾",
                                    "sum_count": 554
                                },
                                {
                                    "challenge_name": "不像",
                                    "sum_count": 540
                                },
                                {
                                    "challenge_name": "多少钱",
                                    "sum_count": 513
                                },
                                {
                                    "challenge_name": "韩寒",
                                    "sum_count": 513
                                },
                                {
                                    "challenge_name": "不知道",
                                    "sum_count": 499
                                },
                                {
                                    "challenge_name": "感觉",
                                    "sum_count": 499
                                },
                                {
                                    "challenge_name": "尹正",
                                    "sum_count": 495
                                },
                                {
                                    "challenge_name": "不看",
                                    "sum_count": 487
                                },
                                {
                                    "challenge_name": "奥特之父",
                                    "sum_count": 484
                                },
                                {
                                    "challenge_name": "阿姨",
                                    "sum_count": 482
                                },
                                {
                                    "challenge_name": "支持",
                                    "sum_count": 482
                                },
                                {
                                    "challenge_name": "父母",
                                    "sum_count": 479
                                },
                                {
                                    "challenge_name": "一条",
                                    "sum_count": 462
                                },
                                {
                                    "challenge_name": "女主",
                                    "sum_count": 456
                                },
                                {
                                    "challenge_name": "确实",
                                    "sum_count": 456
                                },
                                {
                                    "challenge_name": "票房",
                                    "sum_count": 456
                                },
                                {
                                    "challenge_name": "无语",
                                    "sum_count": 443
                                },
                                {
                                    "challenge_name": "干干净净",
                                    "sum_count": 443
                                },
                                {
                                    "challenge_name": "为啥",
                                    "sum_count": 426
                                },
                                {
                                    "challenge_name": "爱情",
                                    "sum_count": 425
                                },
                                {
                                    "challenge_name": "喜剧",
                                    "sum_count": 422
                                },
                                {
                                    "challenge_name": "春节",
                                    "sum_count": 414
                                },
                                {
                                    "challenge_name": "剧情",
                                    "sum_count": 414
                                },
                                {
                                    "challenge_name": "人生",
                                    "sum_count": 409
                                },
                                {
                                    "challenge_name": "风格",
                                    "sum_count": 408
                                },
                                {
                                    "challenge_name": "演员",
                                    "sum_count": 403
                                },
                                {
                                    "challenge_name": "成长",
                                    "sum_count": 403
                                },
                                {
                                    "challenge_name": "玩意",
                                    "sum_count": 402
                                },
                                {
                                    "challenge_name": "文学",
                                    "sum_count": 397
                                }
                            ]
                        }
                    ],
                    "word": {
                        "style": {
                            "keepDirIn3d": false
                        }
                    },
                    "fillingWord": {
                        "style": {
                            "keepDirIn3d": false
                        }
                    },
                    "depth_3d": 200,
                    "colorList": [
                        "#325AB4"
                    ],
                    "wordCloudShapeConfig": {
                        "fillingColorList": [
                            "#5BB5BF",
                            "#92C8C6"
                        ]
                    },
                    "animation": true,
                    "animationAppear": false
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene12-background",
            "zIndex": 0,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": {
                        "gradient": "linear",
                        "x0": 0.1114,
                        "y0": 0.1854,
                        "x1": 1,
                        "y1": 1,
                        "stops": [
                            {
                                "offset": 0,
                                "color": "#E4F0F2"
                            },
                            {
                                "offset": 0.84,
                                "color": "#BED7DC "
                            }
                        ]
                    }
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene12-background-bottom",
            "zIndex": 0,
            "position": {
                "top": 540,
                "left": 0,
                "width": 1440,
                "height": 270
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "#658A92"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12-title",
            "zIndex": 0,
            "position": {
                "top": 190,
                "left": 168,
                "width": 282,
                "height": 124
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12-chart-image",
            "zIndex": 1,
            "position": {
                "top": 120,
                "left": 100,
                "width": 1140,
                "height": 660
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12/chart.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12-bg-decoration",
            "zIndex": 0,
            "position": {
                "top": 84,
                "left": 900,
                "width": 400,
                "height": 500
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12/bg-decoration.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12-text-zh",
            "zIndex": 0,
            "position": {
                "top": 444,
                "left": 168,
                "width": 284,
                "height": 56
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12-text-en",
            "zIndex": 0,
            "position": {
                "top": 584,
                "left": 168,
                "width": 284,
                "height": 66
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12/text-en.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene12-treemap-chart",
            "zIndex": 1,
            "position": {
                "top": 224,
                "left": 750,
                "width": 300,
                "height": 232
            },
            "options": {
                "spec": {
                    "type": "treemap",
                    "background": "transparent",
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "name": "query",
                                    "children": [
                                        {
                                            "name": "methods",
                                            "children": [
                                                {
                                                    "name": "add",
                                                    "value": 593
                                                },
                                                {
                                                    "name": "and",
                                                    "value": 330
                                                },
                                                {
                                                    "name": "average",
                                                    "value": 287
                                                },
                                                {
                                                    "name": "count",
                                                    "value": 277
                                                },
                                                {
                                                    "name": "distinct",
                                                    "value": 292
                                                },
                                                {
                                                    "name": "div",
                                                    "value": 595
                                                },
                                                {
                                                    "name": "eq",
                                                    "value": 594
                                                },
                                                {
                                                    "name": "fn",
                                                    "value": 460
                                                },
                                                {
                                                    "name": "gt",
                                                    "value": 603
                                                },
                                                {
                                                    "name": "gte",
                                                    "value": 625
                                                },
                                                {
                                                    "name": "iff",
                                                    "value": 748
                                                },
                                                {
                                                    "name": "isa",
                                                    "value": 461
                                                },
                                                {
                                                    "name": "lt",
                                                    "value": 597
                                                },
                                                {
                                                    "name": "lte",
                                                    "value": 619
                                                },
                                                {
                                                    "name": "max",
                                                    "value": 283
                                                },
                                                {
                                                    "name": "min",
                                                    "value": 283
                                                },
                                                {
                                                    "name": "mod",
                                                    "value": 591
                                                },
                                                {
                                                    "name": "mul",
                                                    "value": 603
                                                },
                                                {
                                                    "name": "neq",
                                                    "value": 599
                                                },
                                                {
                                                    "name": "not",
                                                    "value": 386
                                                },
                                                {
                                                    "name": "or",
                                                    "value": 323
                                                },
                                                {
                                                    "name": "orderby",
                                                    "value": 307
                                                },
                                                {
                                                    "name": "range",
                                                    "value": 772
                                                },
                                                {
                                                    "name": "select",
                                                    "value": 296
                                                },
                                                {
                                                    "name": "stddev",
                                                    "value": 363
                                                },
                                                {
                                                    "name": "sub",
                                                    "value": 600
                                                },
                                                {
                                                    "name": "sum",
                                                    "value": 280
                                                },
                                                {
                                                    "name": "update",
                                                    "value": 307
                                                },
                                                {
                                                    "name": "variance",
                                                    "value": 335
                                                },
                                                {
                                                    "name": "where",
                                                    "value": 299
                                                },
                                                {
                                                    "name": "xor",
                                                    "value": 354
                                                },
                                                {
                                                    "name": "_",
                                                    "value": 264
                                                }
                                            ]
                                        },
                                        {
                                            "name": "AggregateExpression",
                                            "value": 1616
                                        },
                                        {
                                            "name": "And",
                                            "value": 1027
                                        },
                                        {
                                            "name": "Arithmetic",
                                            "value": 3891
                                        },
                                        {
                                            "name": "Average",
                                            "value": 891
                                        },
                                        {
                                            "name": "BinaryExpression",
                                            "value": 2893
                                        },
                                        {
                                            "name": "Comparison",
                                            "value": 5103
                                        },
                                        {
                                            "name": "CompositeExpression",
                                            "value": 3677
                                        },
                                        {
                                            "name": "Count",
                                            "value": 781
                                        },
                                        {
                                            "name": "DateUtil",
                                            "value": 4141
                                        },
                                        {
                                            "name": "Distinct",
                                            "value": 933
                                        },
                                        {
                                            "name": "Expression",
                                            "value": 5130
                                        },
                                        {
                                            "name": "ExpressionIterator",
                                            "value": 3617
                                        },
                                        {
                                            "name": "Fn",
                                            "value": 3240
                                        },
                                        {
                                            "name": "If",
                                            "value": 2732
                                        },
                                        {
                                            "name": "IsA",
                                            "value": 2039
                                        },
                                        {
                                            "name": "Literal",
                                            "value": 1214
                                        },
                                        {
                                            "name": "Match",
                                            "value": 3748
                                        },
                                        {
                                            "name": "Maximum",
                                            "value": 843
                                        },
                                        {
                                            "name": "Minimum",
                                            "value": 843
                                        },
                                        {
                                            "name": "Not",
                                            "value": 1554
                                        },
                                        {
                                            "name": "Or",
                                            "value": 970
                                        },
                                        {
                                            "name": "Query",
                                            "value": 13896
                                        },
                                        {
                                            "name": "Range",
                                            "value": 1594
                                        },
                                        {
                                            "name": "StringUtil",
                                            "value": 4130
                                        },
                                        {
                                            "name": "Sum",
                                            "value": 791
                                        },
                                        {
                                            "name": "Variable",
                                            "value": 1124
                                        },
                                        {
                                            "name": "Variance",
                                            "value": 1876
                                        },
                                        {
                                            "name": "Xor",
                                            "value": 1101
                                        }
                                    ]
                                },
                                {
                                    "name": "util",
                                    "children": [
                                        {
                                            "name": "palette",
                                            "children": [
                                                {
                                                    "name": "ColorPalette",
                                                    "value": 6367
                                                },
                                                {
                                                    "name": "Palette",
                                                    "value": 1229
                                                },
                                                {
                                                    "name": "ShapePalette",
                                                    "value": 2059
                                                },
                                                {
                                                    "name": "valuePalette",
                                                    "value": 2291
                                                }
                                            ]
                                        },
                                        {
                                            "name": "math",
                                            "children": [
                                                {
                                                    "name": "DenseMatrix",
                                                    "value": 3165
                                                },
                                                {
                                                    "name": "IMatrix",
                                                    "value": 2815
                                                },
                                                {
                                                    "name": "SparseMatrix",
                                                    "value": 3366
                                                }
                                            ]
                                        },
                                        {
                                            "name": "heap",
                                            "children": [
                                                {
                                                    "name": "FibonacciHeap",
                                                    "value": 9354
                                                },
                                                {
                                                    "name": "HeapNode",
                                                    "value": 1233
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Arrays",
                                            "value": 8258
                                        },
                                        {
                                            "name": "Colors",
                                            "value": 10001
                                        },
                                        {
                                            "name": "Dates",
                                            "value": 8217
                                        },
                                        {
                                            "name": "Displays",
                                            "value": 12555
                                        },
                                        {
                                            "name": "Filter",
                                            "value": 2324
                                        },
                                        {
                                            "name": "Geometry",
                                            "value": 10993
                                        },
                                        {
                                            "name": "IEvaluable",
                                            "value": 335
                                        },
                                        {
                                            "name": "IPredicate",
                                            "value": 383
                                        },
                                        {
                                            "name": "IValueProxy",
                                            "value": 874
                                        },
                                        {
                                            "name": "Maths",
                                            "value": 17705
                                        },
                                        {
                                            "name": "Orientation",
                                            "value": 1486
                                        },
                                        {
                                            "name": "Property",
                                            "value": 5559
                                        },
                                        {
                                            "name": "Shapes",
                                            "value": 19118
                                        },
                                        {
                                            "name": "Sort",
                                            "value": 6887
                                        },
                                        {
                                            "name": "Stats",
                                            "value": 6557
                                        },
                                        {
                                            "name": "Strings",
                                            "value": 22026
                                        }
                                    ]
                                },
                                {
                                    "name": "animate",
                                    "children": [
                                        {
                                            "name": "interpolate",
                                            "children": [
                                                {
                                                    "name": "ArrayInterpolator",
                                                    "value": 1983
                                                },
                                                {
                                                    "name": "ColorInterpolator",
                                                    "value": 2047
                                                },
                                                {
                                                    "name": "DateInterpolator",
                                                    "value": 1375
                                                },
                                                {
                                                    "name": "Interpolator",
                                                    "value": 8746
                                                },
                                                {
                                                    "name": "MatrixInterpolator",
                                                    "value": 2202
                                                },
                                                {
                                                    "name": "NumberInterpolator",
                                                    "value": 1382
                                                },
                                                {
                                                    "name": "ObjectInterpolator",
                                                    "value": 1629
                                                },
                                                {
                                                    "name": "PointInterpolator",
                                                    "value": 1675
                                                },
                                                {
                                                    "name": "RectangleInterpolator",
                                                    "value": 2042
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Easing",
                                            "value": 17010
                                        },
                                        {
                                            "name": "FunctionSequence",
                                            "value": 5842
                                        },
                                        {
                                            "name": "ISchedulable",
                                            "value": 1041
                                        },
                                        {
                                            "name": "Parallel",
                                            "value": 5176
                                        },
                                        {
                                            "name": "Pause",
                                            "value": 449
                                        },
                                        {
                                            "name": "Scheduler",
                                            "value": 5593
                                        },
                                        {
                                            "name": "Sequence",
                                            "value": 5534
                                        },
                                        {
                                            "name": "Transition",
                                            "value": 9201
                                        },
                                        {
                                            "name": "Transitioner",
                                            "value": 19975
                                        },
                                        {
                                            "name": "TransitionEvent",
                                            "value": 1116
                                        },
                                        {
                                            "name": "Tween",
                                            "value": 6006
                                        }
                                    ]
                                },
                                {
                                    "name": "scale",
                                    "children": [
                                        {
                                            "name": "IScaleMap",
                                            "value": 2105
                                        },
                                        {
                                            "name": "LinearScale",
                                            "value": 1316
                                        },
                                        {
                                            "name": "LogScale",
                                            "value": 3151
                                        },
                                        {
                                            "name": "OrdinalScale",
                                            "value": 3770
                                        },
                                        {
                                            "name": "QuantileScale",
                                            "value": 2435
                                        },
                                        {
                                            "name": "QuantitativeScale",
                                            "value": 4839
                                        },
                                        {
                                            "name": "RootScale",
                                            "value": 1756
                                        },
                                        {
                                            "name": "Scale",
                                            "value": 4268
                                        },
                                        {
                                            "name": "ScaleType",
                                            "value": 1821
                                        },
                                        {
                                            "name": "TimeScale",
                                            "value": 5833
                                        }
                                    ]
                                },
                                {
                                    "name": "physics",
                                    "children": [
                                        {
                                            "name": "DragForce",
                                            "value": 1082
                                        },
                                        {
                                            "name": "GravityForce",
                                            "value": 1336
                                        },
                                        {
                                            "name": "IForce",
                                            "value": 319
                                        },
                                        {
                                            "name": "NBodyForce",
                                            "value": 10498
                                        },
                                        {
                                            "name": "Particle",
                                            "value": 2822
                                        },
                                        {
                                            "name": "Simulation",
                                            "value": 9983
                                        },
                                        {
                                            "name": "Spring",
                                            "value": 2213
                                        },
                                        {
                                            "name": "SpringForce",
                                            "value": 1681
                                        }
                                    ]
                                },
                                {
                                    "name": "data",
                                    "children": [
                                        {
                                            "name": "converters",
                                            "children": [
                                                {
                                                    "name": "Converters",
                                                    "value": 721
                                                },
                                                {
                                                    "name": "DelimitedTextConverter",
                                                    "value": 4294
                                                },
                                                {
                                                    "name": "GraphMLConverter",
                                                    "value": 9800
                                                },
                                                {
                                                    "name": "IDataConverter",
                                                    "value": 1314
                                                },
                                                {
                                                    "name": "JSONConverter",
                                                    "value": 2220
                                                }
                                            ]
                                        },
                                        {
                                            "name": "DataField",
                                            "value": 1759
                                        },
                                        {
                                            "name": "DataSchema",
                                            "value": 2165
                                        },
                                        {
                                            "name": "DataSet",
                                            "value": 586
                                        },
                                        {
                                            "name": "DataSource",
                                            "value": 3331
                                        },
                                        {
                                            "name": "DataTable",
                                            "value": 772
                                        },
                                        {
                                            "name": "DataUtil",
                                            "value": 3322
                                        }
                                    ]
                                },
                                {
                                    "name": "vis",
                                    "children": [
                                        {
                                            "name": "controls",
                                            "children": [
                                                {
                                                    "name": "AnchorControl",
                                                    "value": 2138
                                                },
                                                {
                                                    "name": "ClickControl",
                                                    "value": 3824
                                                },
                                                {
                                                    "name": "Control",
                                                    "value": 1353
                                                },
                                                {
                                                    "name": "ControlList",
                                                    "value": 4665
                                                },
                                                {
                                                    "name": "DragControl",
                                                    "value": 2649
                                                },
                                                {
                                                    "name": "ExpandControl",
                                                    "value": 2832
                                                },
                                                {
                                                    "name": "HoverControl",
                                                    "value": 4896
                                                },
                                                {
                                                    "name": "IControl",
                                                    "value": 763
                                                },
                                                {
                                                    "name": "PanZoomControl",
                                                    "value": 5222
                                                },
                                                {
                                                    "name": "SelectionControl",
                                                    "value": 7862
                                                },
                                                {
                                                    "name": "TooltipControl",
                                                    "value": 8435
                                                }
                                            ]
                                        },
                                        {
                                            "name": "operator",
                                            "children": [
                                                {
                                                    "name": "layout",
                                                    "children": [
                                                        {
                                                            "name": "AxisLayout",
                                                            "value": 6725
                                                        },
                                                        {
                                                            "name": "BundledEdgeRouter",
                                                            "value": 3727
                                                        },
                                                        {
                                                            "name": "CircleLayout",
                                                            "value": 9317
                                                        },
                                                        {
                                                            "name": "CirclePackingLayout",
                                                            "value": 12003
                                                        },
                                                        {
                                                            "name": "DendrogramLayout",
                                                            "value": 4853
                                                        },
                                                        {
                                                            "name": "ForceDirectedLayout",
                                                            "value": 8411
                                                        },
                                                        {
                                                            "name": "IcicleTreeLayout",
                                                            "value": 4864
                                                        },
                                                        {
                                                            "name": "IndentedTreeLayout",
                                                            "value": 3174
                                                        },
                                                        {
                                                            "name": "Layout",
                                                            "value": 7881
                                                        },
                                                        {
                                                            "name": "NodeLinkTreeLayout",
                                                            "value": 12870
                                                        },
                                                        {
                                                            "name": "PieLayout",
                                                            "value": 2728
                                                        },
                                                        {
                                                            "name": "RadialTreeLayout",
                                                            "value": 12348
                                                        },
                                                        {
                                                            "name": "RandomLayout",
                                                            "value": 870
                                                        },
                                                        {
                                                            "name": "StackedAreaLayout",
                                                            "value": 9121
                                                        },
                                                        {
                                                            "name": "TreeMapLayout",
                                                            "value": 9191
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "encoder",
                                                    "children": [
                                                        {
                                                            "name": "ColorEncoder",
                                                            "value": 3179
                                                        },
                                                        {
                                                            "name": "Encoder",
                                                            "value": 4060
                                                        },
                                                        {
                                                            "name": "PropertyEncoder",
                                                            "value": 4138
                                                        },
                                                        {
                                                            "name": "ShapeEncoder",
                                                            "value": 1690
                                                        },
                                                        {
                                                            "name": "valueEncoder",
                                                            "value": 1830
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "distortion",
                                                    "children": [
                                                        {
                                                            "name": "BifocalDistortion",
                                                            "value": 4461
                                                        },
                                                        {
                                                            "name": "Distortion",
                                                            "value": 6314
                                                        },
                                                        {
                                                            "name": "FisheyeDistortion",
                                                            "value": 3444
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "filter",
                                                    "children": [
                                                        {
                                                            "name": "FisheyeTreeFilter",
                                                            "value": 5219
                                                        },
                                                        {
                                                            "name": "GraphDistanceFilter",
                                                            "value": 3165
                                                        },
                                                        {
                                                            "name": "VisibilityFilter",
                                                            "value": 3509
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "label",
                                                    "children": [
                                                        {
                                                            "name": "Labeler",
                                                            "value": 9956
                                                        },
                                                        {
                                                            "name": "RadialLabeler",
                                                            "value": 3899
                                                        },
                                                        {
                                                            "name": "StackedAreaLabeler",
                                                            "value": 3202
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "IOperator",
                                                    "value": 1286
                                                },
                                                {
                                                    "name": "Operator",
                                                    "value": 2490
                                                },
                                                {
                                                    "name": "OperatorList",
                                                    "value": 5248
                                                },
                                                {
                                                    "name": "OperatorSequence",
                                                    "value": 4190
                                                },
                                                {
                                                    "name": "OperatorSwitch",
                                                    "value": 2581
                                                },
                                                {
                                                    "name": "SortOperator",
                                                    "value": 2023
                                                }
                                            ]
                                        },
                                        {
                                            "name": "data",
                                            "children": [
                                                {
                                                    "name": "render",
                                                    "children": [
                                                        {
                                                            "name": "ArrowType",
                                                            "value": 698
                                                        },
                                                        {
                                                            "name": "EdgeRenderer",
                                                            "value": 5569
                                                        },
                                                        {
                                                            "name": "IRenderer",
                                                            "value": 353
                                                        },
                                                        {
                                                            "name": "ShapeRenderer",
                                                            "value": 2247
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "Data",
                                                    "value": 20544
                                                },
                                                {
                                                    "name": "DataList",
                                                    "value": 19788
                                                },
                                                {
                                                    "name": "DataSprite",
                                                    "value": 10349
                                                },
                                                {
                                                    "name": "EdgeSprite",
                                                    "value": 3301
                                                },
                                                {
                                                    "name": "NodeSprite",
                                                    "value": 19382
                                                },
                                                {
                                                    "name": "ScaleBinding",
                                                    "value": 11275
                                                },
                                                {
                                                    "name": "Tree",
                                                    "value": 7147
                                                },
                                                {
                                                    "name": "TreeBuilder",
                                                    "value": 9930
                                                }
                                            ]
                                        },
                                        {
                                            "name": "axis",
                                            "children": [
                                                {
                                                    "name": "Axes",
                                                    "value": 1302
                                                },
                                                {
                                                    "name": "Axis",
                                                    "value": 24593
                                                },
                                                {
                                                    "name": "AxisGridLine",
                                                    "value": 652
                                                },
                                                {
                                                    "name": "AxisLabel",
                                                    "value": 636
                                                },
                                                {
                                                    "name": "CartesianAxes",
                                                    "value": 6703
                                                }
                                            ]
                                        },
                                        {
                                            "name": "events",
                                            "children": [
                                                {
                                                    "name": "DataEvent",
                                                    "value": 2313
                                                },
                                                {
                                                    "name": "SelectionEvent",
                                                    "value": 1880
                                                },
                                                {
                                                    "name": "TooltipEvent",
                                                    "value": 1701
                                                },
                                                {
                                                    "name": "VisualizationEvent",
                                                    "value": 1117
                                                }
                                            ]
                                        },
                                        {
                                            "name": "legend",
                                            "children": [
                                                {
                                                    "name": "Legend",
                                                    "value": 20859
                                                },
                                                {
                                                    "name": "LegendItem",
                                                    "value": 4614
                                                },
                                                {
                                                    "name": "LegendRange",
                                                    "value": 10530
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Visualization",
                                            "value": 16540
                                        }
                                    ]
                                },
                                {
                                    "name": "display",
                                    "children": [
                                        {
                                            "name": "DirtySprite",
                                            "value": 8833
                                        },
                                        {
                                            "name": "LineSprite",
                                            "value": 1732
                                        },
                                        {
                                            "name": "RectSprite",
                                            "value": 3623
                                        },
                                        {
                                            "name": "TextSprite",
                                            "value": 10066
                                        }
                                    ]
                                },
                                {
                                    "name": "analytics",
                                    "children": [
                                        {
                                            "name": "graph",
                                            "children": [
                                                {
                                                    "name": "BetweennessCentrality",
                                                    "value": 3534
                                                },
                                                {
                                                    "name": "LinkDistance",
                                                    "value": 5731
                                                },
                                                {
                                                    "name": "MaxFlowMinCut",
                                                    "value": 7840
                                                },
                                                {
                                                    "name": "ShortestPaths",
                                                    "value": 5914
                                                },
                                                {
                                                    "name": "SpanningTree",
                                                    "value": 3416
                                                }
                                            ]
                                        },
                                        {
                                            "name": "cluster",
                                            "children": [
                                                {
                                                    "name": "AgglomerativeCluster",
                                                    "value": 3938
                                                },
                                                {
                                                    "name": "CommunityStructure",
                                                    "value": 3812
                                                },
                                                {
                                                    "name": "HierarchicalCluster",
                                                    "value": 6714
                                                },
                                                {
                                                    "name": "MergeEdge",
                                                    "value": 743
                                                }
                                            ]
                                        },
                                        {
                                            "name": "optimization",
                                            "children": [
                                                {
                                                    "name": "AspectRatioBanker",
                                                    "value": 7074
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "name": "flex",
                                    "children": [
                                        {
                                            "name": "FlareVis",
                                            "value": 4116
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "width": 290,
                    "height": 209,
                    "categoryField": "name",
                    "valueField": "value",
                    "label": {
                        "visible": true,
                        "style": {
                            "fontSize": 12
                        }
                    },
                    "nodePadding": 1,
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "rgb(224, 81, 81)"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12_2-title",
            "zIndex": 0,
            "position": {
                "top": 190,
                "left": 168,
                "width": 282,
                "height": 124
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12-2/title.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12_2-chart-image",
            "zIndex": 1,
            "position": {
                "top": 120,
                "left": 100,
                "width": 1140,
                "height": 660
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12-2/chart.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12_2-text-zh",
            "zIndex": 0,
            "position": {
                "top": 444,
                "left": 168,
                "width": 284,
                "height": 56
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12-2/text-zh.png"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene12_2-text-en",
            "zIndex": 0,
            "position": {
                "top": 584,
                "left": 168,
                "width": 284,
                "height": 66
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene12-2/text-en.png"
                }
            }
        },
        {
            "type": "VChart",
            "id": "scene12_2-sunburst-chart",
            "zIndex": 1,
            "position": {
                "top": 224,
                "left": 750,
                "width": 300,
                "height": 232
            },
            "options": {
                "spec": {
                    "type": "sunburst",
                    "offsetX": 0,
                    "offsetY": 0,
                    "padding": 0,
                    "categoryField": "name",
                    "valueField": "value",
                    "outerRadius": 1,
                    "innerRadius": 0,
                    "gap": 2,
                    "drill": true,
                    "labelLayout": {
                        "align": "center",
                        "rotate": "radial"
                    },
                    "sunburst": {
                        "visible": true,
                        "style": {}
                    },
                    "label": {
                        "visible": false
                    },
                    "data": [
                        {
                            "id": "data",
                            "values": [
                                {
                                    "name": "query",
                                    "children": [
                                        {
                                            "name": "methods",
                                            "children": [
                                                {
                                                    "name": "add",
                                                    "value": 593
                                                },
                                                {
                                                    "name": "and",
                                                    "value": 330
                                                },
                                                {
                                                    "name": "average",
                                                    "value": 287
                                                },
                                                {
                                                    "name": "count",
                                                    "value": 277
                                                },
                                                {
                                                    "name": "distinct",
                                                    "value": 292
                                                },
                                                {
                                                    "name": "div",
                                                    "value": 595
                                                },
                                                {
                                                    "name": "eq",
                                                    "value": 594
                                                },
                                                {
                                                    "name": "fn",
                                                    "value": 460
                                                },
                                                {
                                                    "name": "gt",
                                                    "value": 603
                                                },
                                                {
                                                    "name": "gte",
                                                    "value": 625
                                                },
                                                {
                                                    "name": "iff",
                                                    "value": 748
                                                },
                                                {
                                                    "name": "isa",
                                                    "value": 461
                                                },
                                                {
                                                    "name": "lt",
                                                    "value": 597
                                                },
                                                {
                                                    "name": "lte",
                                                    "value": 619
                                                },
                                                {
                                                    "name": "max",
                                                    "value": 283
                                                },
                                                {
                                                    "name": "min",
                                                    "value": 283
                                                },
                                                {
                                                    "name": "mod",
                                                    "value": 591
                                                },
                                                {
                                                    "name": "mul",
                                                    "value": 603
                                                },
                                                {
                                                    "name": "neq",
                                                    "value": 599
                                                },
                                                {
                                                    "name": "not",
                                                    "value": 386
                                                },
                                                {
                                                    "name": "or",
                                                    "value": 323
                                                },
                                                {
                                                    "name": "orderby",
                                                    "value": 307
                                                },
                                                {
                                                    "name": "range",
                                                    "value": 772
                                                },
                                                {
                                                    "name": "select",
                                                    "value": 296
                                                },
                                                {
                                                    "name": "stddev",
                                                    "value": 363
                                                },
                                                {
                                                    "name": "sub",
                                                    "value": 600
                                                },
                                                {
                                                    "name": "sum",
                                                    "value": 280
                                                },
                                                {
                                                    "name": "update",
                                                    "value": 307
                                                },
                                                {
                                                    "name": "variance",
                                                    "value": 335
                                                },
                                                {
                                                    "name": "where",
                                                    "value": 299
                                                },
                                                {
                                                    "name": "xor",
                                                    "value": 354
                                                },
                                                {
                                                    "name": "_",
                                                    "value": 264
                                                }
                                            ]
                                        },
                                        {
                                            "name": "AggregateExpression",
                                            "value": 1616
                                        },
                                        {
                                            "name": "And",
                                            "value": 1027
                                        },
                                        {
                                            "name": "Arithmetic",
                                            "value": 3891
                                        },
                                        {
                                            "name": "Average",
                                            "value": 891
                                        },
                                        {
                                            "name": "BinaryExpression",
                                            "value": 2893
                                        },
                                        {
                                            "name": "Comparison",
                                            "value": 5103
                                        },
                                        {
                                            "name": "CompositeExpression",
                                            "value": 3677
                                        },
                                        {
                                            "name": "Count",
                                            "value": 781
                                        },
                                        {
                                            "name": "DateUtil",
                                            "value": 4141
                                        },
                                        {
                                            "name": "Distinct",
                                            "value": 933
                                        },
                                        {
                                            "name": "Expression",
                                            "value": 5130
                                        },
                                        {
                                            "name": "ExpressionIterator",
                                            "value": 3617
                                        },
                                        {
                                            "name": "Fn",
                                            "value": 3240
                                        },
                                        {
                                            "name": "If",
                                            "value": 2732
                                        },
                                        {
                                            "name": "IsA",
                                            "value": 2039
                                        },
                                        {
                                            "name": "Literal",
                                            "value": 1214
                                        },
                                        {
                                            "name": "Match",
                                            "value": 3748
                                        },
                                        {
                                            "name": "Maximum",
                                            "value": 843
                                        },
                                        {
                                            "name": "Minimum",
                                            "value": 843
                                        },
                                        {
                                            "name": "Not",
                                            "value": 1554
                                        },
                                        {
                                            "name": "Or",
                                            "value": 970
                                        },
                                        {
                                            "name": "Query",
                                            "value": 13896
                                        },
                                        {
                                            "name": "Range",
                                            "value": 1594
                                        },
                                        {
                                            "name": "StringUtil",
                                            "value": 4130
                                        },
                                        {
                                            "name": "Sum",
                                            "value": 791
                                        },
                                        {
                                            "name": "Variable",
                                            "value": 1124
                                        },
                                        {
                                            "name": "Variance",
                                            "value": 1876
                                        },
                                        {
                                            "name": "Xor",
                                            "value": 1101
                                        }
                                    ]
                                },
                                {
                                    "name": "util",
                                    "children": [
                                        {
                                            "name": "palette",
                                            "children": [
                                                {
                                                    "name": "ColorPalette",
                                                    "value": 6367
                                                },
                                                {
                                                    "name": "Palette",
                                                    "value": 1229
                                                },
                                                {
                                                    "name": "ShapePalette",
                                                    "value": 2059
                                                },
                                                {
                                                    "name": "valuePalette",
                                                    "value": 2291
                                                }
                                            ]
                                        },
                                        {
                                            "name": "math",
                                            "children": [
                                                {
                                                    "name": "DenseMatrix",
                                                    "value": 3165
                                                },
                                                {
                                                    "name": "IMatrix",
                                                    "value": 2815
                                                },
                                                {
                                                    "name": "SparseMatrix",
                                                    "value": 3366
                                                }
                                            ]
                                        },
                                        {
                                            "name": "heap",
                                            "children": [
                                                {
                                                    "name": "FibonacciHeap",
                                                    "value": 9354
                                                },
                                                {
                                                    "name": "HeapNode",
                                                    "value": 1233
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Arrays",
                                            "value": 8258
                                        },
                                        {
                                            "name": "Colors",
                                            "value": 10001
                                        },
                                        {
                                            "name": "Dates",
                                            "value": 8217
                                        },
                                        {
                                            "name": "Displays",
                                            "value": 12555
                                        },
                                        {
                                            "name": "Filter",
                                            "value": 2324
                                        },
                                        {
                                            "name": "Geometry",
                                            "value": 10993
                                        },
                                        {
                                            "name": "IEvaluable",
                                            "value": 335
                                        },
                                        {
                                            "name": "IPredicate",
                                            "value": 383
                                        },
                                        {
                                            "name": "IValueProxy",
                                            "value": 874
                                        },
                                        {
                                            "name": "Maths",
                                            "value": 17705
                                        },
                                        {
                                            "name": "Orientation",
                                            "value": 1486
                                        },
                                        {
                                            "name": "Property",
                                            "value": 5559
                                        },
                                        {
                                            "name": "Shapes",
                                            "value": 19118
                                        },
                                        {
                                            "name": "Sort",
                                            "value": 6887
                                        },
                                        {
                                            "name": "Stats",
                                            "value": 6557
                                        },
                                        {
                                            "name": "Strings",
                                            "value": 22026
                                        }
                                    ]
                                },
                                {
                                    "name": "animate",
                                    "children": [
                                        {
                                            "name": "interpolate",
                                            "children": [
                                                {
                                                    "name": "ArrayInterpolator",
                                                    "value": 1983
                                                },
                                                {
                                                    "name": "ColorInterpolator",
                                                    "value": 2047
                                                },
                                                {
                                                    "name": "DateInterpolator",
                                                    "value": 1375
                                                },
                                                {
                                                    "name": "Interpolator",
                                                    "value": 8746
                                                },
                                                {
                                                    "name": "MatrixInterpolator",
                                                    "value": 2202
                                                },
                                                {
                                                    "name": "NumberInterpolator",
                                                    "value": 1382
                                                },
                                                {
                                                    "name": "ObjectInterpolator",
                                                    "value": 1629
                                                },
                                                {
                                                    "name": "PointInterpolator",
                                                    "value": 1675
                                                },
                                                {
                                                    "name": "RectangleInterpolator",
                                                    "value": 2042
                                                }
                                            ]
                                        },
                                        {
                                            "name": "Easing",
                                            "value": 17010
                                        },
                                        {
                                            "name": "FunctionSequence",
                                            "value": 5842
                                        },
                                        {
                                            "name": "ISchedulable",
                                            "value": 1041
                                        },
                                        {
                                            "name": "Parallel",
                                            "value": 5176
                                        },
                                        {
                                            "name": "Pause",
                                            "value": 449
                                        },
                                        {
                                            "name": "Scheduler",
                                            "value": 5593
                                        },
                                        {
                                            "name": "Sequence",
                                            "value": 5534
                                        },
                                        {
                                            "name": "Transition",
                                            "value": 9201
                                        },
                                        {
                                            "name": "Transitioner",
                                            "value": 19975
                                        },
                                        {
                                            "name": "TransitionEvent",
                                            "value": 1116
                                        },
                                        {
                                            "name": "Tween",
                                            "value": 6006
                                        }
                                    ]
                                },
                                {
                                    "name": "scale",
                                    "children": [
                                        {
                                            "name": "IScaleMap",
                                            "value": 2105
                                        },
                                        {
                                            "name": "LinearScale",
                                            "value": 1316
                                        },
                                        {
                                            "name": "LogScale",
                                            "value": 3151
                                        },
                                        {
                                            "name": "OrdinalScale",
                                            "value": 3770
                                        },
                                        {
                                            "name": "QuantileScale",
                                            "value": 2435
                                        },
                                        {
                                            "name": "QuantitativeScale",
                                            "value": 4839
                                        },
                                        {
                                            "name": "RootScale",
                                            "value": 1756
                                        },
                                        {
                                            "name": "Scale",
                                            "value": 4268
                                        },
                                        {
                                            "name": "ScaleType",
                                            "value": 1821
                                        },
                                        {
                                            "name": "TimeScale",
                                            "value": 5833
                                        }
                                    ]
                                },
                                {
                                    "name": "physics",
                                    "children": [
                                        {
                                            "name": "DragForce",
                                            "value": 1082
                                        },
                                        {
                                            "name": "GravityForce",
                                            "value": 1336
                                        },
                                        {
                                            "name": "IForce",
                                            "value": 319
                                        },
                                        {
                                            "name": "NBodyForce",
                                            "value": 10498
                                        },
                                        {
                                            "name": "Particle",
                                            "value": 2822
                                        },
                                        {
                                            "name": "Simulation",
                                            "value": 9983
                                        },
                                        {
                                            "name": "Spring",
                                            "value": 2213
                                        },
                                        {
                                            "name": "SpringForce",
                                            "value": 1681
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "animationEnter": {
                        "easing": "cubicInOut",
                        "duration": 1000
                    },
                    "animationExit": {
                        "easing": "cubicInOut",
                        "duration": 1000
                    },
                    "animationUpdate": {
                        "easing": "cubicInOut",
                        "duration": 1000
                    },
                    "animation": true,
                    "animationAppear": false
                },
                "panel": {
                    "fill": "white"
                }
            }
        },
        {
            "type": "Rect",
            "id": "scene13-background",
            "zIndex": 2,
            "position": {
                "top": 0,
                "left": 0,
                "width": 1440,
                "height": 810
            },
            "options": {
                "graphic": {
                    "stroke": false,
                    "fill": "white"
                }
            }
        },
        {
            "type": "Image",
            "id": "scene13-logo",
            "zIndex": 2,
            "position": {
                "top": 320,
                "left": 350,
                "width": 740,
                "height": 166
            },
            "options": {
                "graphic": {
                    "image": "/vstory/assets/scene13/logo.png"
                }
            }
        }
    ],
    "acts": [
        {
            "id": "default-chapter",
            "scenes": [
                {
                    "id": "scene1",
                    "actions": [
                        {
                            "characterId": "chart0",
                            "characterActions": [
                                {
                                    "startTime": 500,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart1",
                            "characterActions": [
                                {
                                    "startTime": 800,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart2",
                            "characterActions": [
                                {
                                    "startTime": 1100,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart3",
                            "characterActions": [
                                {
                                    "startTime": 1400,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart4",
                            "characterActions": [
                                {
                                    "startTime": 1700,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart9",
                            "characterActions": [
                                {
                                    "startTime": 500,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart8",
                            "characterActions": [
                                {
                                    "startTime": 800,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart7",
                            "characterActions": [
                                {
                                    "startTime": 1100,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart6",
                            "characterActions": [
                                {
                                    "startTime": 1400,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart5",
                            "characterActions": [
                                {
                                    "startTime": 1700,
                                    "duration": 1000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "title1",
                            "characterActions": [
                                {
                                    "startTime": 1500,
                                    "duration": 500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "typewriter",
                                            "easing": "quadIn"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "title2",
                            "characterActions": [
                                {
                                    "startTime": 2000,
                                    "duration": 500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "typewriter",
                                            "easing": "quadIn"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart9",
                            "characterActions": [
                                {
                                    "startTime": 2500,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart8",
                            "characterActions": [
                                {
                                    "startTime": 2600,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart7",
                            "characterActions": [
                                {
                                    "startTime": 2700,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart6",
                            "characterActions": [
                                {
                                    "startTime": 2800,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart5",
                            "characterActions": [
                                {
                                    "startTime": 2900,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart0",
                            "characterActions": [
                                {
                                    "startTime": 2500,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart1",
                            "characterActions": [
                                {
                                    "startTime": 2600,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart2",
                            "characterActions": [
                                {
                                    "startTime": 2700,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart3",
                            "characterActions": [
                                {
                                    "startTime": 2800,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart4",
                            "characterActions": [
                                {
                                    "startTime": 2900,
                                    "duration": 2000,
                                    "action": "bounce",
                                    "payload": {
                                        "animation": {
                                            "duration": 2000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "titlesubtitle",
                            "characterActions": [
                                {
                                    "startTime": 2700,
                                    "duration": 500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 200,
                                            "easing": "linear",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart9",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart8",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart7",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart6",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart5",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart4",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart3",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart2",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart1",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "chart0",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "titlesubtitle",
                            "characterActions": [
                                {
                                    "startTime": 6000,
                                    "duration": 1000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "linear",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene2",
                    "actions": [
                        {
                            "characterId": "title1",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "duration": 800,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 250,
                                            "y": 80
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                },
                                {
                                    "startTime": 0,
                                    "duration": 800,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "fontSize": 40
                                        },
                                        "animation": {
                                            "duration": 800
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "title2",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "duration": 800,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 550,
                                            "y": 80
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                },
                                {
                                    "startTime": 0,
                                    "duration": 800,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "fontSize": 40
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene2-title2",
                            "characterActions": [
                                {
                                    "startTime": 1200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 800,
                                            "easing": "linear",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "title1",
                            "characterActions": [
                                {
                                    "startTime": 6200,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": -650,
                                            "y": 80
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "title2",
                            "characterActions": [
                                {
                                    "startTime": 6200,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": -350,
                                            "y": 80
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene2-title2",
                            "characterActions": [
                                {
                                    "startTime": 6200,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": -750,
                                            "y": 80
                                        },
                                        "animation": {
                                            "duration": 800,
                                            "easing": "quadInOut"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 1200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 5000,
                                            "effect": "default"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene3",
                    "actions": [
                        {
                            "characterId": "scene3-background",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 800,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "fade",
                                                "move"
                                            ],
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-background-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "fade",
                                                "move"
                                            ],
                                            "move": {
                                                "pos": "right"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title1",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-line-top",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-line-bottom",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-Nicole",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-1486",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "effect": "move",
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-text-image-top",
                            "characterActions": [
                                {
                                    "startTime": 300,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "move",
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-1",
                            "characterActions": [
                                {
                                    "startTime": 330,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "move",
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1500,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 150
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-2",
                            "characterActions": [
                                {
                                    "startTime": 330,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "move",
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1500,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 150,
                                            "dx": -50
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-3",
                            "characterActions": [
                                {
                                    "startTime": 330,
                                    "duration": 500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1500,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 150
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-4",
                            "characterActions": [
                                {
                                    "startTime": 330,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1500,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 150,
                                            "dx": -50
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-5",
                            "characterActions": [
                                {
                                    "startTime": 330,
                                    "duration": 500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1500,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 260,
                                            "dx": -100
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "startTime": 3500,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-text-image-bottom",
                            "characterActions": [
                                {
                                    "startTime": 360,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "bar",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "cubicOut",
                                            "fade": {
                                                "opacity": 1,
                                                "easing": "linear"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "update",
                                    "startTime": 3500,
                                    "payload": {
                                        "id": "data",
                                        "duration": 1000,
                                        "data": [
                                            {
                                                "sourceValue": {
                                                    "x": "1",
                                                    "y": 100,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "1",
                                                    "y": 10,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "2",
                                                    "y": 100,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "2",
                                                    "y": 20,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "3",
                                                    "y": 100,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "3",
                                                    "y": 30,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "4",
                                                    "y": 100,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "4",
                                                    "y": 40,
                                                    "type": "Category1"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "update",
                                    "startTime": 4500,
                                    "payload": {
                                        "duration": 1000,
                                        "id": "data",
                                        "data": [
                                            {
                                                "sourceValue": {
                                                    "x": "1",
                                                    "y": 100,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "1",
                                                    "y": 10,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "2",
                                                    "y": 100,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "2",
                                                    "y": 20,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "3",
                                                    "y": 100,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "3",
                                                    "y": 30,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "4",
                                                    "y": 100,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "4",
                                                    "y": 40,
                                                    "type": "Category2"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "update",
                                    "startTime": 5500,
                                    "payload": {
                                        "id": "data",
                                        "duration": 1000,
                                        "data": [
                                            {
                                                "sourceValue": {
                                                    "x": "1",
                                                    "y": 10,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "1",
                                                    "y": 100,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "2",
                                                    "y": 20,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "2",
                                                    "y": 100,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "3",
                                                    "y": 30,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "3",
                                                    "y": 100,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "4",
                                                    "y": 40,
                                                    "type": "Category1"
                                                },
                                                "targetValue": {
                                                    "x": "4",
                                                    "y": 100,
                                                    "type": "Category1"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "1",
                                                    "y": 10,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "1",
                                                    "y": 100,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "2",
                                                    "y": 20,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "2",
                                                    "y": 100,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "3",
                                                    "y": 30,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "3",
                                                    "y": 100,
                                                    "type": "Category2"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": "4",
                                                    "y": 40,
                                                    "type": "Category2"
                                                },
                                                "targetValue": {
                                                    "x": "4",
                                                    "y": 100,
                                                    "type": "Category2"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "easing": "cubicInOut",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0.1,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title1",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-line-top",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-line-bottom",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-Nicole",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-1486",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-title-image",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-text-image-top",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-1",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-2",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-3",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-4",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "duration": 700,
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-chart-image-5",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-text-image-bottom",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-background-decoration",
                            "characterActions": [
                                {
                                    "action": "disappear",
                                    "startTime": 6500,
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-background",
                            "characterActions": [
                                {
                                    "action": "moveTo",
                                    "startTime": 6500,
                                    "payload": {
                                        "destination": {
                                            "x": 0,
                                            "y": 0
                                        },
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 900,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                },
                                {
                                    "startTime": 0,
                                    "action": "scaleTo",
                                    "payload": {
                                        "scale": {
                                            "scaleX": 0.8,
                                            "scaleY": 0.8
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                },
                                {
                                    "startTime": 0,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 500,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 600,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 6400,
                                            "easing": "linear"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene4",
                    "actions": [
                        {
                            "characterId": "scene4-title-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-title",
                            "characterActions": [
                                {
                                    "duration": 700,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-subtitle",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-line-left",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-line-left-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "startTime": 1300,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 500,
                                            "height": 120
                                        },
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "startTime": 2500,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700
                                        }
                                    }
                                },
                                {
                                    "startTime": 5000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-text-zh-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1300,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "dx": 50,
                                            "dy": 10
                                        },
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-text-zh-line",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 1300,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "dx": 50,
                                            "dy": 10
                                        },
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-text-en-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-green-rect",
                            "characterActions": [
                                {
                                    "startTime": 200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-decoration",
                            "characterActions": [
                                {
                                    "startTime": 200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-grey-rect",
                            "characterActions": [
                                {
                                    "startTime": 200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene4-bg-decoration",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scatter",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "cubicOut",
                                            "fade": {
                                                "opacity": 1,
                                                "isBaseOpacity": true,
                                                "easing": "linear"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "update",
                                    "startTime": 3500,
                                    "duration": 1000,
                                    "payload": {
                                        "id": "data",
                                        "data": [
                                            {
                                                "sourceValue": {
                                                    "x": 104,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 104,
                                                    "y": 103.95909999999998,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 98,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 98,
                                                    "y": 75.67990000000003,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 93,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 93,
                                                    "y": 55.93090000000001,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 90,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 90,
                                                    "y": 45.74709999999999,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 76,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 76,
                                                    "y": 14.739900000000034,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 70,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 70,
                                                    "y": 9.779100000000028,
                                                    "type": "A"
                                                }
                                            },
                                            {
                                                "sourceValue": {
                                                    "x": 63,
                                                    "y": 10,
                                                    "type": "A"
                                                },
                                                "targetValue": {
                                                    "x": 63,
                                                    "y": 10.306900000000041,
                                                    "type": "A"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 6000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 500,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 850,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene3-background",
                            "characterActions": [
                                {
                                    "action": "style",
                                    "startTime": 6000,
                                    "payload": {
                                        "graphic": {
                                            "scaleY": 0
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 6000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene5",
                    "actions": [
                        {
                            "characterId": "scene5-background-top",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 5760,
                                            "height": 2360,
                                            "x": -1800,
                                            "y": -720
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-background-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-background-bottom",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 5760,
                                            "height": 880,
                                            "x": -1800,
                                            "y": 1640
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-title-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 1024,
                                            "height": 1684,
                                            "x": -960,
                                            "y": -220
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-zh-text",
                            "characterActions": [
                                {
                                    "startTime": 200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 800,
                                            "height": 360,
                                            "x": 280,
                                            "y": 904
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-chart-image",
                            "characterActions": [
                                {
                                    "startTime": 400,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 1240,
                                            "height": 1560,
                                            "x": 1512,
                                            "y": -68
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-atom",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 1600,
                                            "height": 560,
                                            "x": -960,
                                            "y": 1760
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-chart",
                            "characterActions": [
                                {
                                    "startTime": 2000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 4000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene5-en-text",
                            "characterActions": [
                                {
                                    "startTime": 300,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 700,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "width": 1760,
                                            "height": 400,
                                            "x": 1000,
                                            "y": 1840
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 5400,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 5900,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 500,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 800,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene6",
                    "delay": -500,
                    "actions": [
                        {
                            "characterId": "scene6-bg1",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1,
                                            "effect": "scale"
                                        }
                                    }
                                },
                                {
                                    "startTime": 8000,
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "x": 90,
                                            "width": 1262
                                        },
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 300
                                        }
                                    }
                                },
                                {
                                    "startTime": 8500,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-bg2",
                            "characterActions": [
                                {
                                    "startTime": 8000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 0
                                        }
                                    }
                                },
                                {
                                    "startTime": 14995,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 5
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-img1",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1200,
                                            "effect": "scale"
                                        }
                                    }
                                },
                                {
                                    "startTime": 8200,
                                    "duration": 300,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 300,
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-chart",
                            "characterActions": [
                                {
                                    "startTime": 1500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 500,
                                            "effect": [
                                                "fade",
                                                "scale"
                                            ],
                                            "fade": {
                                                "opacity": 1,
                                                "isBaseOpacity": true
                                            },
                                            "scale": {
                                                "ratio": 1
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 2000,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 239.27,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 114.75,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 107.57,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 55.99,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 36.41,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 33.92,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 23.76,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 23.02,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 22.96,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 22.28,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 17.24,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 14.54,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 10.98,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 9.93,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 7.87,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 5.66,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 4.13,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 2.78,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 2500,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 278.39,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 126.03,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 121.14,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 64.08,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 41.42,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 32.36,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 30.08,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 29.22,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 24.97,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 24.65,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 22.62,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 18.16,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 15.39,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 13.12,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 10.8,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 7.48,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 6,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 3.9,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 3000,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 336.52,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 141.5,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 129.86,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 67.43,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 42.83,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 35,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 34.79,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 26.98,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 26.86,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 25,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 24.13,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 20.98,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 20.87,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 18.48,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 13.13,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 9.07,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 7.84,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 5.51,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 3500,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 427.65,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 166.06,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 158.98,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 80.43,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 49.07,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 45.4,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 39.95,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 33.34,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 31.27,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 30.96,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 30.52,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 26.89,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 25.64,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 24.8,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 15.72,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 11.35,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 8.97,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 6.88,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 4000,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 488.02,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 177.75,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 167.18,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 89.63,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 56.68,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 56.32,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 45.79,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 42.74,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 41.6,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 37.57,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 34.67,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 33.35,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 30.95,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 28.05,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 17.99,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 15.04,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 10.72,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 10,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 4500,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 521.74,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 196.37,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 196.13,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 104.8,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 77.27,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 67.57,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 59.6,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 50.56,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 46.09,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 42.88,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 37.79,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 37.31,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 36.51,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 34.83,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 19.93,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 18.94,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 14.07,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 12.09,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 5000,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 545.92,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 228.64,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 211.73,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 126.72,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 102.5,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 84.42,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 75.95,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 55.06,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 51.46,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 49.45,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 42.29,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 42.16,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 40.5,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 38.32,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 25.62,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 22.26,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 18.21,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 14.62,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 5500,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 578.41,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 253.56,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 221.5,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 147.39,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 143.18,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 106.28,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 86.71,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 74.66,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 67.94,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 57.96,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 51.34,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 48.92,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 47.72,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 43.33,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 31.95,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 26.27,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 24.1,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 19.14,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 6000,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 589.42,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 260.51,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 204.67,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 197.84,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 134.78,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 125.32,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 97.51,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 89.73,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 84.97,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 62.9,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 61.07,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 51.47,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 49.5,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 44.93,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 37.88,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 29.65,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 24.97,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 24.7,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 6500,
                                    "action": "update",
                                    "payload": {
                                        "id": "dataId",
                                        "duration": 500,
                                        "values": [
                                            {
                                                "max": 617.03,
                                                "min": 0,
                                                "country": "日本",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 287.93,
                                                "min": 0,
                                                "country": "英国",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 282.22,
                                                "min": 0,
                                                "country": "印度",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 214.1,
                                                "min": 0,
                                                "country": "意大利",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 153.95,
                                                "min": 0,
                                                "country": "西班牙",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 144.97,
                                                "min": 0,
                                                "country": "韩国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 124.05,
                                                "min": 0,
                                                "country": "土耳其",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 114.69,
                                                "min": 0,
                                                "country": "印尼",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 94.81,
                                                "min": 0,
                                                "country": "荷兰",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 70.16,
                                                "min": 0,
                                                "country": "沙特",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 67.46,
                                                "min": 0,
                                                "country": "瑞士",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 58.93,
                                                "min": 0,
                                                "country": "瑞典",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 53.84,
                                                "min": 0,
                                                "country": "比利时",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 48.93,
                                                "min": 0,
                                                "country": "挪威",
                                                "continent": "欧洲"
                                            },
                                            {
                                                "max": 44.23,
                                                "min": 0,
                                                "country": "泰国",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 38.21,
                                                "min": 0,
                                                "country": "马来",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 34.03,
                                                "min": 0,
                                                "country": "菲律宾",
                                                "continent": "亚洲"
                                            },
                                            {
                                                "max": 26.92,
                                                "min": 0,
                                                "country": "芬兰",
                                                "continent": "欧洲"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "startTime": 7000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1200,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-img2",
                            "characterActions": [
                                {
                                    "startTime": 8500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "startTime": 14000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-img3",
                            "characterActions": [
                                {
                                    "startTime": 8500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 14000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-range-chart",
                            "characterActions": [
                                {
                                    "startTime": 10000,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "cubicInOut",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 1,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 13000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "cubicInOut",
                                            "duration": 1000,
                                            "fade": {
                                                "opacity": 0,
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-img4",
                            "characterActions": [
                                {
                                    "startTime": 8500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000,
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "startTime": 14000,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 1000
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-bg-bottom",
                            "characterActions": [
                                {
                                    "startTime": 8200,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 300
                                        }
                                    }
                                },
                                {
                                    "startTime": 14995,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 5,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene6-bg-top",
                            "characterActions": [
                                {
                                    "startTime": 8500,
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "easing": "easeInOutQuad",
                                            "duration": 600
                                        }
                                    }
                                },
                                {
                                    "startTime": 14995,
                                    "action": "disappear",
                                    "payload": {
                                        "animation": {
                                            "duration": 5,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 500,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 14000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 1000,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 750,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene7",
                    "actions": [
                        {
                            "characterId": "scene7-background-top",
                            "characterActions": [
                                {
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "scaleX": 1
                                        },
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-background-middle",
                            "characterActions": [
                                {
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "scaleX": 1
                                        },
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-background-bottom",
                            "characterActions": [
                                {
                                    "action": "style",
                                    "payload": {
                                        "graphic": {
                                            "scaleX": 1
                                        },
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-zh-text",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 100,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-en-text",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 300,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-pie-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene7-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 3500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "to": "top"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 5500,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 500,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 700,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene8",
                    "delay": -500,
                    "actions": [
                        {
                            "characterId": "scene8-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 700,
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "from": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 1,
                                    "duration": 700,
                                    "payload": {
                                        "graphic": {
                                            "fill": "rgb(30,34,33)"
                                        },
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-bg-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 800,
                                    "payload": {
                                        "animation": {
                                            "duration": 800,
                                            "easing": "easeInOutQuad",
                                            "move": {
                                                "from": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 800,
                                    "payload": {
                                        "animation": {
                                            "duration": 800,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-text",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 800,
                                    "payload": {
                                        "animation": {
                                            "duration": 800,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-image1",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 1500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1500,
                                            "easing": "easeInOutElastic",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom-left"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 200,
                                    "duration": 1500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1500,
                                            "easing": "easeInOutElastic",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top-right"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-image2",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1,
                                    "duration": 1500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1500,
                                            "easing": "easeInOutElastic",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom-right"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene8-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2500,
                                    "duration": 700,
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5200,
                                    "duration": 700,
                                    "payload": {
                                        "animation": {
                                            "duration": 700,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 600,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 6000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 1000,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 650,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene9",
                    "delay": -500,
                    "actions": [
                        {
                            "characterId": "scene9-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-bg-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-person",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 300,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-text-zh",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 300,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-text-en",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 300,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 300,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene9-rose-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2000,
                                    "payload": {
                                        "animation": {
                                            "duration": 200,
                                            "easing": "linear",
                                            "effect": "fade",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 2400,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 31.8,
                                                "month": "Jan"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 39.2,
                                                "month": "Jan"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 24.1,
                                                "month": "Jan"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 2600,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 46.4,
                                                "month": "Feb"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 38,
                                                "month": "Feb"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 22.3,
                                                "month": "Feb"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 2800,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 30.3,
                                                "month": "Mar"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 30.9,
                                                "month": "Mar"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 23.4,
                                                "month": "Mar"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 3000,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 60.8,
                                                "month": "Apr"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 26.8,
                                                "month": "Apr"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 24.5,
                                                "month": "Apr"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 3200,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 31.7,
                                                "month": "May"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 26.4,
                                                "month": "May"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 27,
                                                "month": "May"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 3400,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 38.7,
                                                "month": "Jun"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 36.7,
                                                "month": "Jun"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 33.4,
                                                "month": "Jun"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 3600,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 25.3,
                                                "month": "Jul"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 34.7,
                                                "month": "Jul"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 28.2,
                                                "month": "Jul"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 3800,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 45.3,
                                                "month": "Aug"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 25.3,
                                                "month": "Aug"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 30.8,
                                                "month": "Aug"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 4000,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 26.8,
                                                "month": "Sep"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 29.4,
                                                "month": "Sep"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 20.9,
                                                "month": "Sep"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 4200,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 39.8,
                                                "month": "Oct"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 38.5,
                                                "month": "Oct"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 39,
                                                "month": "Oct"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 4400,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 38.3,
                                                "month": "Nov"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 23.8,
                                                "month": "Nov"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 29.4,
                                                "month": "Nov"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "add",
                                    "startTime": 4600,
                                    "payload": {
                                        "id": "1856Rose",
                                        "duration": 200,
                                        "values": [
                                            {
                                                "type": "rail",
                                                "value": 62.8,
                                                "month": "Dec"
                                            },
                                            {
                                                "type": "highway",
                                                "value": 35.8,
                                                "month": "Dec"
                                            },
                                            {
                                                "type": "civil aviation",
                                                "value": 35.2,
                                                "month": "Dec"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 500,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 7000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 1000,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 600,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene10",
                    "delay": -500,
                    "actions": [
                        {
                            "characterId": "scene10-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-person",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-bg-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-text-zh",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-text-en",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene10-radar-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "move",
                                                "fade"
                                            ],
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 500,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 7000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 1000,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 550,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene11",
                    "actions": [
                        {
                            "characterId": "scene11-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-bg-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 7000,
                                    "payload": {
                                        "graphic": {
                                            "x": 194,
                                            "y": 322,
                                            "width": 2,
                                            "height": 2,
                                            "opacity": 0
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-text-en",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 7000,
                                    "payload": {
                                        "graphic": {
                                            "x": 118,
                                            "y": 86,
                                            "width": 2,
                                            "height": 2,
                                            "opacity": 0
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-text-zh",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 7000,
                                    "payload": {
                                        "graphic": {
                                            "x": 804,
                                            "y": -115,
                                            "width": 2,
                                            "height": 2,
                                            "opacity": 0
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "top"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 7000,
                                    "payload": {
                                        "graphic": {
                                            "x": 804,
                                            "y": 330,
                                            "width": 2,
                                            "height": 2,
                                            "opacity": 0
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene11-wordcloud-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 2000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 4500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "style",
                                    "startTime": 7000,
                                    "payload": {
                                        "graphic": {
                                            "x": 804,
                                            "y": 330,
                                            "width": 2,
                                            "height": 2,
                                            "opacity": 0
                                        },
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 0,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 7500,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 500,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 500,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene12",
                    "delay": -1500,
                    "actions": [
                        {
                            "characterId": "scene12-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-background-bottom",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 200,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "bottom"
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-text-zh",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-text-en",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 1000,
                                    "duration": 500,
                                    "payload": {
                                        "animation": {
                                            "duration": 500,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-bg-decoration",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 500,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12-treemap-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 3000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "centerGrow",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "left",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 1500,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 6300,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "startTime": 2000,
                                    "action": "moveTo",
                                    "payload": {
                                        "destination": {
                                            "x": 450,
                                            "y": 60
                                        },
                                        "animation": {
                                            "duration": 500
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene12_2",
                    "delay": -1000,
                    "actions": [
                        {
                            "characterId": "scene12_2-title",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12_2-chart-image",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12_2-text-zh",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12_2-text-en",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "move",
                                            "move": {
                                                "pos": "right",
                                                "isVariableSpeed": false
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene12_2-sunburst-chart",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 3000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": [
                                                "centerGrow",
                                                "fade"
                                            ],
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 5500,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "isBaseOpacity": true
                                            }
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "timeline",
                            "characterActions": [
                                {
                                    "startTime": 1000,
                                    "action": "state",
                                    "payload": {
                                        "animation": {
                                            "effect": "forward",
                                            "duration": 6000,
                                            "easing": "linear"
                                        }
                                    }
                                },
                                {
                                    "action": "disappear",
                                    "startTime": 7000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "scene13",
                    "actions": [
                        {
                            "characterId": "scene13-background",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 0,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 1000,
                                            "easing": "easeInOutQuad",
                                            "effect": "fade"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            "characterId": "scene13-logo",
                            "characterActions": [
                                {
                                    "action": "appear",
                                    "startTime": 0,
                                    "duration": 1000,
                                    "payload": {
                                        "animation": {
                                            "duration": 2000,
                                            "effect": "scale",
                                            "easing": "easeInOutQuad",
                                            "fade": {
                                                "opacity": 1
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0', scaleX: 0.5, scaleY: 0.5 });
const player = new VStory.Player(story);
story.init(player);

player.play(1);

window['story'] = story;
window['vstory'] = story;
```
