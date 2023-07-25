# `MessageBox()` Sample Output
```
MessageBox({   title               :   string
            ,  message             :   string
            ,[ titleTextColor      :   string                                ]
            ,[ messageTextColor    :   string                                ]
            ,[ backColor           :   string                                ]
            ,[ icon                :   string                                ]
            ,[ timeout             :   number(ms)                            ]
            ,[ timeoutResultCancel :   boolean                               ]
            ,[ timeoutResultID     :   number                                ]
            ,[ display             : ( integer | lightuserdata )             ]
            ,  commands            : { array of {    value         : integer
                                                   , name          : string  }}
            ,  inputs              : { array of {    value         : string
                                                   , name          : string
                                                   , blackFilter   : string
                                                   , whiteFilter   : string
                                                   , vkPlugin      : string
                                                   , maxTextLength : integer }}
            ,  states              : { array of {    name          : string
                                                   , state         : boolean
                                                  [, group         : integer ]}}
            ,  selectors           : { array of {    name          : string
                                                   , selectedValue : integer
                                                   , values        : table
                                                  [, type          : integer ( 0-swipe, 1-radio ) ]}}
           })
```


# Available Colors

|                 Name                 | RGBA Value ( Hex ) |
|--------------------------------------|:------------------:|
|  `Global.Transparent`                |     `00000000`     |
|  `Global.Transparent25`              |     `00000040`     |
|  `Global.Background`                 |     `00000080`     |
|  `Global.Transparent50`              |     `00000080`     |
|  `Global.Shadow`                     |     `0000008D`     |
|  `Global.Transparent75`              |     `000000C0`     |
|  `Global.Darkened`                   |     `000000FF`     |
|  `Global.PartlySelectedPreset`       |     `004800FF`     |
|  `Global.SelectedPreset`             |     `00D7FFFF`     |
|  `Global.BackgroundSelectedInverted` |     `202020FF`     |
|  `Global.BackgroundSelected`         |     `2A2A30FF`     |
|  `Global.Hover`                      |     `323232FF`     |
|  `Global.Pressed`                    |     `797985FF`     |
|  `Global.Inactive`                   |     `7A7A7DA0`     |
|  `Global.PartlySelected`             |     `804000FF`     |
|  `Global.SelectedInverted`           |     `80FF80FF`     |
|  `Global.LabelText`                  |     `999999FF`     |
|  `Global.Bright`                     |     `BEBEC0FF`     |
|  `Global.SelectedEdge`               |     `E1FFC2FF`     |
|  `Global.Collected`                  |     `FF8000FF`     |
|  `Global.UserChanged`                |     `FF8022FF`     |
|  `Global.InvalidGridPosition`        |     `FF8080FF`     |
|  `Global.Selected`                   |     `FFD700FF`     |
|  `Global.Disabled`                   |     `FFFFFF50`     |
