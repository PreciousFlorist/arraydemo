
# *Wait, who even are you?*

My name is Shane! I'm a web developer with 6 years of experience working on frontend and backend environments, with much of it spent working with PHP, SASS, and WordPress. Right now, I'm working with Briteweb in Vancouver.

I live right up the road from your office, on Prideaux and Fitz, and have been passing by your office on a daily basis since I moved into town. *(Unrelated, but how neat is that building??)*

So, I've seen you around, keeping up with your socials, and have been checking out your website. I love your design work, and my development background seems to align very well with your product offerings.

So, as we're nearing the end of a season, I'm reaching out to connect with you and see what's up - and if there might be some chemistry here. 

![What the f--](https://media1.tenor.com/m/4FX2fvso4BEAAAAC/wtf-wtf-tom-delonge.gif)

## ...*uh huh*... *So, what is this?*

This project is a Valentine's Day card - a little love letter to Array. 

I'm a big fan of your work (read above), and I've taken on this project over the past week with the intention of showing you my development process.

My hope is that this project will help demonstrate the approach I take when solving problems, where along the process I notice things are wrong and how I fix them.


![I choo-choo-choose you!](https://media1.tenor.com/m/YNBKbwhjfNcAAAAd/the-simpsons-ralph-wiggum.gif)


I've done my best to reinterpret the code behind the homepage of your website while using a totally different tech stack. The outcome is the same, the approach is similar, but the processes are different.

I know that your team recently worked on this project too, so I'm hoping that will provide some insight when taking a look through this repo. I'm curious to hear if you have any insights on the approaches I've taken, the solutions I've implemented, and the issues I've overlooked.

As a bonus, this was a great opportunity to familiarize myself with your team's work *(could this get any more parasocial? I know, I know)*. And I'm just really impressed.

# *Wow! This sounds great. Now tell us about the project*

This was developed using three main tools: [SvelteKit](https://kit.svelte.dev/), [Tailwind](https://tailwindcss.com/) , and [GSAP](https://gsap.com/). It's easy to get good performance results on a static website, but I'd be remiss not to share these lighthouse results:

![Holy moly :0](https://github.com/PreciousFlorist/arraydemo/blob/master/readme-images/performance.png)

Anyways, while navigating this project, please consider the following:


All content has been stored locally in JSON files, which are fetched and processed via serverside routes
- `src/routes/+layout.server.js` (data for page layout)
- `src/routes/+page.server.js` (data for block content)

Then, the data is then destructured, images are prefetched, and the page structure is rendered
- `src/routes/+layout.svelte`
- `src/routes/+page.svelte`

The website is made up of these individual components:
|6 reusable blocks| 4 layout components| 4 reusable assets|
|---|---|---|
|Hero|Navbar|Button|
|Contact Modal|Mobile Navbar|Link|
|Accordion|Sidebar|Custom Cursor|
|Slider|Footer|Social Media Icons|
|Call to Action|`src/lib/layout`|`s/lib/components/assets`|
|News Grid|
|`src/lib/components/blocks`|

The project was developed with a WordPress context in mind. The idea is that, with minimal tweaking, the local sample data could be replaced with a GraphQL, and the app could conditionally render pages and blocks from an actual CMS.


### *How can we build this locally?*

Clone the Repo:
`git clone https://github.com/PreciousFlorist/arraydemo.git`

Install Dependencies:
`npm install`

You can clone the project here:
`https://github.com/PreciousFlorist/arraydemo.git`

Start the Development Server:
`npm run dev`

Build and Preview:

To build the project for production, use:
`npm run build``

After building, you can preview the built site using:
`npm run preview`

## *Very interesting! But let's talk tough*:

- *Why did you choose this tech-stack?*

Svelte has been on my radar for a while, as it's topped the [State of JS](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) charts for a while, and I've been interested in checking it out. So this was just an opportunity to try something new.

I'm familiar with Tailwind, which is also very popular in the [State of CSS](https://2023.stateofcss.com/en-US/css-frameworks/) reports, but I mostly chose it because I saw that this project was originally developed with SASS. I felt that choosing a framework like this helped reinforce my goal to *reinterpret* an existing project - rather than simply redeveloping it.

Finally, GSAP is just a favourite animation toolkit of mine. But in this instance, honestly, it's more of a wedge than a wrench. Svelte has a number of built-in animation tools that render this library a bit redundant. So, if I had given myself more time to turn this project around, I probably would have removed it completely.


![What do you do here?](https://assets-global.website-files.com/5905ea3c9086586eadd9a253/642ef38047d776e4e678b604_DfwDvNmMWIGY1Yo1Yv5tuHhMtCrhRF1Dy_GTpmwQqun_evL1EUgEAfcVd3JICLflfj_1mKms50Uizm9-V8Aw4KDGGOMvaWvvy3FS2-xj7t3jUBnYLK6X5OcnFDknznuap02gIlvOTNu199wr0rz2JJs.gif)

- *What gave you trouble?*

I hugely overestimated the number (and quality) of resources available for SvelteKit. Tools that are usually readily available for PHP or React are often incompatible (looking at you *Swiper.js*), do not exist (responsive image generators), or I just couldn't find them.

Speaking of the carousel functionality, specifically, I ended up using a slideshow tool called [Splide](https://splidejs.com/integration/svelte-splide/), which I had never worked with before. It's currently being used for the Accordion carousel.

But once I started working on the more complex Reel slider, splide just couldn't keep up (vertical looping slides that recognized touch events on the entire block). I ended up building out a custom carousel tool for this component, monitoring user drag actions and slide transitions.

Otherwise, I generally underestimated the complexity of this single page. I started developing the Accordion early on because I thought it would be straightforward, but I was shocked to see that each panel included a carousel and custom cursor toggles.

- *I notice that there are some bugs, and that you didn't match all characteristics of the design. What's up with that?*

There are several known issues here, and this is not representative of a finished product. It was developed using a Chromium browser and has not been optimized for Safari or Firefox. So there are several CSS bugs, mostly affecting class transition.

| *"if i had more time i would have written a shorter letter"* | *"if i had more time i would have debugged webkit"* |
|---|---|
| - blase pascal | - shane walders |

Otherwise, yes, there are variances in font sizes, breakpoints, and addition to many other values. I view this project as a proof-of-concept, and I hope that you might as well.

- *Would you recommend this toolset for future projects?*

SvelteKit is great! Very intuitive, and they make it very easy to integrate server-side and client-side code without the context switching of changing frameworks or languages.

But, customizing classes with Tailwind is a bit arduous, and it can be difficult to override styles for components that you don't have inline access to.

So, overall, I'm not totally convinced. But I'd love to hear what you think.

# *I gotta say, shane, we like the project and we like YOU. But what now?*

Well, this is for you. You're welcome to clone the repo if it's of any value.

The project is not being indexed, so it won't interfere with your SEO. But, I understand that this project belongs to you, and these are your assets, so let me know once you've taken a look at it and are ready for me to pull it down.

In the meantime, you're welcome to take a look at [my portfolio](https://shanewalders.ca/) to see some actual WordPress projects I've developed with PHP/Laravel.

So, with that all said, if you find my work compelling (and you have room for another developer) I would love to have a conversation and see if we can make something work.


### 

Thank you for taking the time to consider my work, and to consider me!

-Shane

![okay bye!](https://media1.tenor.com/m/1EaGqSpMblYAAAAC/bye-okay.gif)
