---
title: 1. Setting up Development Environment

key words: VisActor, VChart, VTable, VStrory, VMind, VGrammar, VRender, Visualization, Chart, Data, Table, Graph, Gis, LLM
---
# Github

## 1.1 Register an Account

The VisActor team usually develops and maintains issues on Github. Please open the [Github website](https://github.com/), click the `Sign up` button in the upper right corner, register your own account, and start your open source journey.

If, due to special circumstances, you are unable to access the Github site, please inform us and proceed with project development through [Gitee](https://gitee.com/VisActor/VStory).

## 1.2 Fork the Project

First, you need to fork this project. Go to the [VStory project page](https://github.com/VisActor/VStory) and click the Fork button in the upper right corner.



<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/LQbyb5XWgoV8w2x3D5uc8bIkn1c.gif' alt='' width='1000' height='auto'>



Your github account will show the project xxxx(your github username)/vstory

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/OuwMbtoyPof0S8xrisscWJ3Hneb.gif' alt='' width='849' height='auto'>

# Local Development Environment

## 2.1 Install Git

Since the code is hosted on Github, we use git for version control.

Git is a version control system used to track and manage code changes in software development projects. It helps developers record and manage the history of code, facilitating team collaboration, code version control, code merging, and other operations. With Git, you can track every version of each file and easily switch and compare between different versions. Git also provides branch management functionality, allowing multiple parallel development tasks to be carried out simultaneously.

* Visit the Git official website: [https://git-scm.com/](https://git-scm.com/)

* Download the latest version of the Git installer.

* Run the downloaded installer and follow the installation wizard instructions.

* After installation, you can confirm the successful installation by using the `git version` command in the command line.

```
HM4G2J09L6:~ xuanhun$ git version
**git version 2.39.2 (Apple Git-143)**

```
## 2.2 Install Development Tools (Recommended: VSCode)

VisActor is mainly based on the front-end technology stack, and there are many tools available for front-end development. We recommend using VSCode. Of course, you can also use your preferred development tool.

If you are not familiar with VSCode, it is recommended to read the official documentation: [https://vscode.js.cn/docs/setup/setup-overview](https://vscode.js.cn/docs/setup/setup-overview)

## 2.3 Install Marscode AI Programming Assistant

[Marscode AI Programming Assistant](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a)

Marscode AI Programming Assistant is an AI programming assistant provided by Marscode, offering AI features such as intelligent code completion. It supports mainstream programming languages and IDEs, providing suggestions for writing single lines of code or entire functions during development. Additionally, it supports features such as code interpretation, unit test generation, and issue fixing, improving development efficiency and quality. For more information, please refer to the [documentation of Marscode AI Programming Assistant](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a).

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/DLaKb4PysoADAZx0x1RcYjXbnBe.gif' alt='' width='760' height='auto'>

With Marscode, VisActor developers can easily perform tasks such as code understanding, document writing, feature development, and unit testing. Detailed examples will be provided in the contribution guidelines for various tasks.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/BQeib7E2gonoOaxLPqjcRtAYngh.gif' alt='' width='1000' height='auto'>



## 2.4 Clone the Code to Local

Navigate to the VStory folder and add the remote address of VStory.

```
git remote add upstream https://github.com/VisActor/VStory.git

```
Get the latest source code of VStory.

```
git pull upstream develop

```
# Initialize the Project

First, globally install [<u>@microsoft/rush</u>](https://rushjs.io/pages/intro/get_started/)

```
$ npm i --global @microsoft/rush

```
Next, run the command to view the demo.

```
# Install dependencies
$ rush update
# Start the demo page of vstory
$ rush start
# Start the local documentation site
$ rush docs

```
# Next Steps

By now, you have prepared for developing the code. Please continue reading the next section of the tutorial to start different types of tasks.

Github: [github.com/VisActor](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor)

Leave a message on the VisActor WeChat subscription account (you can join the WeChat group through the subscription account menu):

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/KLjmbz9TtoGzPIxarv7cmhpgnSY.gif' alt='' width='258' height='auto'>

VisActor Official Website: [www.visactor.io/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.io%2Fvtable)

Feishu Group:

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/Cv9xb0zzLoUWyaxMVgccWuGPn7d.gif' alt='' width='264' height='auto'>

Discord: [https://discord.com/invite/3wPyxVyH6m](https://discord.com/invite/3wPyxVyH6m)


# This document is contributed by the following individuals

[玄魂](https://github.com/xuanhun)
