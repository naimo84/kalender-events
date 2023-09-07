import{_ as o,r as i,o as c,c as r,a as n,b as s,d as a,w as t,e as l}from"./app-148e4e27.js";const d="/kalender-events/assets/nodered-palette-manager-87e01329.png",u={},v=n("h1",{id:"overview",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#overview","aria-hidden":"true"},"#"),s(" Overview")],-1),m=n("p",null,"This Node module gets the events from an ical-URL, a caldav-server or from iCloud.",-1),k=n("h2",{id:"usage-as-node-red-nodes",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#usage-as-node-red-nodes","aria-hidden":"true"},"#"),s(" Usage as Node-RED nodes")],-1),b={href:"http://nodered.org/docs/getting-started/installation",target:"_blank",rel:"noopener noreferrer"},g=l('<h3 id="install-node-red-contrib-ical-events" tabindex="-1"><a class="header-anchor" href="#install-node-red-contrib-ical-events" aria-hidden="true">#</a> Install node-red-contrib-ical-events</h3><h4 id="node-red-palette-manager" tabindex="-1"><a class="header-anchor" href="#node-red-palette-manager" aria-hidden="true">#</a> Node-RED palette manager</h4><p><img src="'+d+'" alt="sensor_node.png"></p><p>There are three types of nodes:</p>',4),h=l(`<h2 id="usage-as-cli" tabindex="-1"><a class="header-anchor" href="#usage-as-cli" aria-hidden="true">#</a> Usage as cli</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>installed via npm globally: npm i -g kalender-events-cli
alternatively: npx kalender-events-cli@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: kalender-events [options] [command]

Options:
  -u, --url [url]                          URL to Calendar
  -t, --type, --calenderType [type]        Type can be ical, icloud or caldav
  --pastview [pastview]
  --pastview-units [pastviewUnits]
  --preview [preview]
  --preview-units [previewUnits]
  --filter [filter]
  --filter-property [filterProperty]
  --filter-operator [filterOperator]
  --trigger [trigger]
  --now [now]
  --username [username]
  --password [password]
  --includeTodo
  --replaceDates, --replacedates
  --language [language]
  --eventTypes, --eventtypes [eventtypes]
  --basicAuth [basicAuth]
  -h, --help                               display help for command

Commands:
  upcoming                                 A list of events
  trigger                                  Trigger a output on event start and event end
  sensors                                  Check if a event is running currently
  icloudurl                                Get iCloud Calenders and URL
  help [command]                           display help for command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage-in-your-own-node-module" tabindex="-1"><a class="header-anchor" href="#usage-in-your-own-node-module" aria-hidden="true">#</a> Usage in your own node module</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> kalender-events
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//Typescript - index.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> KalenderEvents <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;kalender-events&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> ev <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KalenderEvents</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    url<span class="token operator">:</span> <span class="token string">&quot;https://calendar.google.com/calendar/ical/xxx%40group.calendar.google.com/private-xxx/basic.ics&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ev<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">&#39;ical&#39;</span><span class="token punctuation">,</span>
    preview<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    previewUnits<span class="token operator">:</span><span class="token string">&#39;days&#39;</span><span class="token punctuation">,</span>
    pastview<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    pastviewUnits<span class="token operator">:</span><span class="token string">&#39;days&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>or</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//Javascript - index.js</span>

<span class="token keyword">var</span> kalender_events <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;kalender-events&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> ev <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">kalender_events<span class="token punctuation">.</span>KalenderEvents</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&quot;https://calendar.google.com/calendar/ical/xxx%40group.calendar.google.com/private-xxx/basic.ics&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

ev<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ical&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">preview</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">previewUnits</span><span class="token operator">:</span> <span class="token string">&#39;days&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pastview</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">pastviewUnits</span><span class="token operator">:</span> <span class="token string">&#39;days&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>output:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tsc index.ts
$ <span class="token function">node</span> .<span class="token punctuation">\\</span>index.js
<span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    date: <span class="token string">&#39;02.05.2020 10:00&#39;</span>,
    event: <span class="token string">&#39;test&#39;</span>,
    summary: <span class="token string">&#39;test&#39;</span>,
    topic: <span class="token string">&#39;test&#39;</span>,
    calendarName: undefined,
    eventStart: <span class="token number">2020</span>-05-02T07:00:00.000Z,
    eventEnd: <span class="token number">2020</span>-05-02T08:00:00.000Z,
    description: <span class="token string">&#39;&#39;</span>,
    id: <span class="token string">&#39;123@google.com&#39;</span>,
    allDay: false,
    rule: <span class="token string">&#39; &#39;</span>,
    location: <span class="token string">&#39;&#39;</span>,
    countdown: <span class="token punctuation">{</span> days: -1, hours: -7, minutes: -26, seconds: <span class="token parameter variable">-38</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10);function y(f,x){const p=i("ExternalLinkIcon"),e=i("RouterLink");return c(),r("div",null,[v,m,k,n("p",null,[s("First of all install "),n("a",b,[s("Node-RED"),a(p)])]),g,n("ul",null,[n("li",null,[a(e,{to:"/guide/upcoming.html"},{default:t(()=>[s("upcoming")]),_:1}),s(" - a list of events")]),n("li",null,[a(e,{to:"/guide/sensors.html"},{default:t(()=>[s("sensors")]),_:1}),s(" - check if a event is running currently")]),n("li",null,[a(e,{to:"/guide/trigger.html"},{default:t(()=>[s("trigger")]),_:1}),s(" - trigger a output on event start and event end")])]),h])}const _=o(u,[["render",y],["__file","index.html.vue"]]);export{_ as default};
