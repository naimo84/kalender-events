import{_ as n,o as s,c as a,e}from"./app-148e4e27.js";const t={},p=e(`<h1 id="use-as-libary" tabindex="-1"><a class="header-anchor" href="#use-as-libary" aria-hidden="true">#</a> Use as libary</h1><h2 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> Typescript</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//Typescript - index.ts</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="javascript" tabindex="-1"><a class="header-anchor" href="#javascript" aria-hidden="true">#</a> Javascript</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//Javascript - index.js</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> output</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ tsc index.ts
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),i=[p];function c(o,l){return s(),a("div",null,i)}const u=n(t,[["render",c],["__file","examples_lib.html.vue"]]);export{u as default};
