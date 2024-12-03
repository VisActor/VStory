---
title: 4. How to Contribute Demo

key words: VisActor, VChart, VTable, VStory, VMind, VGrammar, VRender, Visualization, Chart, Data, Table, Graph, Gis, LLM
---

# Create Branch

The default branch for VStory is the develop branch. Whether it's feature development, bug fixes, or documentation writing, please create a new branch and then merge it into the develop branch. Use the following code to create a branch:

```
// Create a branch for documentation and demo
git checkout -b docs/add-funnel-demo

```

# Find or Create Issue

In principle, we require that each PR has a corresponding issue. Before starting development, please make sure there is a corresponding issue and the issue has not been claimed.

## Search for Demo Issue

You can search for demo-related issues in the following way:

```
label:demos

```

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/RDQZbKyEYomaIRx7jwJccGoMnId.gif' alt='' width='769' height='auto'>

Some features may be associated with the `doc` label, so you can further check if the issue is purely a demo task.

## Create Demo Issue

Click on "NEW ISSUE", open the issue selection page, choose "**Others**".

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/VNGhbVirmoaQTIxhOlFc61w3nqb.gif' alt='' width='1000' height='auto'>

Fill in the relevant information for the document issue you want to submit, and tag it with the "demos" label.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/Cc8SbSAFFoCvQ2xJFd6cjv17nyc.gif' alt='' width='1000' height='auto'>

# Claim Issue

If you want to submit a demo or fix a demo bug, you can leave a message under that issue to claim it. The administrator will contact you, confirm, and then assign the issue to you.

For example:

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/Q2vGbhmevorebJxa8Toc1hmtnMc.gif' alt='' width='988' height='auto'>

# Create or Modify Demo

The location of VStory documents and demos in the project is as follows (examples):

<img src='https://cdn.jsdelivr.net/gh/xiaoluoHe/articles/visactor/img/SCR-20241202-oujh.png' alt='' width='500' height='auto'>

Taking the example document of the bar leap animation as an example (currently one example contains both Chinese and English versions, located in the zh & en paths):

<img src='https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vstory-contributing-bar-leap.png' alt='' width='1000' height='auto'>

The example Markdown content is divided into several parts:

- Metadata: Defines the attributes of the example content, including chart category, cover image, keywords, etc.
- Title: The content under the first-level title corresponds to the description of the example.
- Key Configurations: Key configuration explanations included in the example, which will be displayed on the right side of the example page under "Key Configurations".
- Code Demo: The specific code content executed in the example, currently only supports native JavaScript code.

The metadata fields in Markdown are defined as follows:

- group: The category information of the example, describing what chart category the current example belongs to.
- title: The title of the example.
- keywords: Keywords of the example.
- order: The sorting basis of the example under the same group.
- cover: The cover image of the example.
- tutorial: Link to the tutorial (the default example tutorial will jump to the tutorial corresponding to the example group).

Currently, the group of chart examples contains multiple categories, such as animate, works-show, etc., corresponding to the categories under all charts in the VStory example gallery. You can refer to existing example documents to fill in specific category fields.

<img src='https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vstory-contributing-examples-page.png' alt='' width='1000' height='auto'>

After completing the new demo, you can add the demo path and title in the `docs/assets/examples/menu.json` file:

<img src='https://cdn.jsdelivr.net/gh/xiaoluoHe/articles/visactor/img/SCR-20241202-skwm.png' alt='' width='800' height='auto'>

> For image resources needed during the demo creation process, please refer to [6. How to Upload Image](./6-How%20to%20upload%20image) chapter.

# Use Marscode AI Programming Assistant for Demo Writing

With the help of the [Marscode AI Programming Assistant](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a), you can provide comprehensive assistance throughout the document creation process.

If you haven't installed the [Marscode AI Programming Assistant](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a) yet, please download it from this link: https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a

In demo writing, using the context directive appropriately can improve the accuracy of the content.

`**⭐️ #Workspace**`

Select global code in Workspace as context, and AI will automatically find relevant code context based on the user query.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/XQaqbAX59oLBKOxR7ngctRbQnXb.gif' alt='' width='1000' height='auto'>

`**⭐️ #Files**`

Search and select files in the code repository as context.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/MhZTbAAD2oj1XJxil8WcHYSWn6d.gif' alt='' width='1000' height='auto'>

`**⭐️ #Code**`

Search and select functions or classes in the code repository as context.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/V4M7bX87hoHOxOxM1Nfc9of0nhL.gif' alt='' width='1000' height='auto'>

Here are examples of how to use the [Marscode AI Programming Assistant](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a) for demo writing.

## 5.1 Provide Document Framework

Here **by invoking #Workspace**, then ask questions, select the content of an example document, and ask it to generate a new example document based on it.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/TUHVbTez5o6IjtxmCLhcWnGHnZg.gif' alt='' width='1000' height='auto'>

You can continue to make detailed adjustments based on this.

## 5.2 Generate Text Descriptions

The description text for each demo can be generated first using [Marscode](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a), and then proofread and adjusted. For example:

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/U6n7bEo0DoaCGyxtiVVc1GBGnrg.gif' alt='' width='1000' height='auto'>

## 5.3 Generate Example Code

To better explain the principles and usage, it is usually necessary to provide a demo that can be actually run. You can use the code generation capability of [Marscode](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a) to generate example code for us. However, the code generation capabilities of various AIs cannot guarantee accuracy, so further verification is needed.

## 5.4 Content Retrieval

Usually, each Q&A in [Marscode](https://www.marscode.cn/home?utm_source=developer&utm_medium=oss&utm_campaign=visactor_a) will provide reference documents, which can provide more context for further analysis.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/DGyBbfi99oucAYxxkyJcfka3nJa.gif' alt='' width='1000' height='auto'>

You can also directly search for files:

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/WM9Ubr9JYoYAjOxFQ6tc8cW3nLd.gif' alt='' width='1000' height='auto'>

# Submit Code

After completing the document, push the code to your remote branch. For example:

```
git commit -a -m "docs: add custom funnel demo and related docs"

```

VisActor's commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, with `docs` used for demos.

`<type>[optional scope]: <description>`

Common `type` values include docs (documentation, log changes), feat (new feature), fix (bug fix), refactor (code refactoring), etc. Please choose according to the actual situation.

Write a brief and precise description in English before committing.

Before submitting the commit, we will perform commit lint checks. You can check the [lint rules](https://github.com/VisActor/VStory/blob/develop/common/autoinstallers/lint/commitlint.config.js) for details.

A common issue is when the remote upstream (@visactor/vstory) has been updated, which may cause conflicts when submitting the Pull Request. Therefore, before submitting, merge the commits from other developers with your own commits. Switch to the develop branch using the following code:

```
git checkout develop

```

Pull the latest code from the remote:

```
git pull upstream develop

```

Switch back to your development branch:

```
git checkout docs/add-funnel-demo

```

Merge the commits from develop into your branch:

```
git rebase develop

```

Push the updated code to your branch:

```
git push origin docs/add-funnel-demo

```

# Submit PR

You can click the `Compare & pull request` button on your GitHub repository page.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/FWm3bZjbnoaqUOxiygXcFdLznwf.gif' alt='' width='1000' height='auto'>

Or create one through the `contribute` button:

Fill in the modifications for this submission according to the template:

- Check the type of modification.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/V7xpbJhhEoSoCExC31WcyKvHnDe.gif' alt='' width='692' height='auto'>

- Fill in the associated issue.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/O6YqbpdxgodBjfxHXEpcwob4n5E.gif' alt='' width='470' height='auto'>

- If there are complex changes, explain the background and solution.

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/QsnYbfLCio4u3MxK2uIc8epKnXh.gif' alt='' width='1000' height='auto'>

After filling in the relevant information, click Create pull request to submit.

The administrator will review the PR to decide whether to approve it. If it is not approved, modifications will be required before resubmitting.

# Next Steps

You can continue to try different types of tasks.

GitHub: [github.com/VisActor](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor)

VisActor WeChat subscription account (you can join the WeChat group through the subscription account menu):

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/I8OdbhGfkort6oxqHW6cR492n7d.gif' alt='' width='258' height='auto'>

VisActor Official Website: [www.visactor.io/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.io%2Fvtable)

Feishu Group:

<img src='https://cdn.jsdelivr.net/gh/xuanhun/articles/visactor/img/DdEAbEU9yoFq9IxjrN4curJnnyf.gif' alt='' width='264' height='auto'>

Discord: https://discord.com/invite/3wPyxVyH6m

# This Document is Contributed by the Following Individuals

[Xuanhun](https://github.com/xuanhun)
