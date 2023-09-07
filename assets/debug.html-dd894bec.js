import{_ as r,r as d,o,c as i,a as n,b as e,d as a,e as t}from"./app-148e4e27.js";const l={},c=n("h1",{id:"debug-node-red-contrib-ical-events",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#debug-node-red-contrib-ical-events","aria-hidden":"true"},"#"),e(" Debug node-red-contrib-ical-events")],-1),p={href:"https://github.com/niamo84/kalender-events",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.npmjs.com/package/debug",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>To activate the additional logging, you have to set the environment variable <code>DEBUG</code> to <code>kalender-events</code>.</p><p>To do so, you have serveral options: (The following should also work with the Raspberry Pi commands, described here: https://nodered.org/docs/getting-started/raspberrypi)</p><ul><li><p>add the environment variable directly before the node-red command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>kalender-events* node-red
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>add the environment variable for the current session before executing the node-red command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>kalender-events* 
node-red
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>add the environment variable at the top of the settings.js file of node-red and restart node-red:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">DEBUG</span><span class="token operator">=</span><span class="token string">&quot;kalender-events*&quot;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// the tcp port that the Node-RED web server is listening on</span>
  <span class="token literal-property property">uiPort</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">PORT</span> <span class="token operator">||</span> <span class="token number">1880</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>add the environment variable the docker envs and restart it:</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment">################################################################################</span>
<span class="token comment"># Node-RED Stack or Compose</span>
<span class="token comment">################################################################################</span>
<span class="token comment"># docker stack deploy node-red --compose-file docker-compose-node-red.yml</span>
<span class="token comment"># docker-compose -f docker-compose-node-red.yml -p myNoderedProject up</span>
<span class="token comment">################################################################################</span>
version: &quot;3.7&quot;

services:
node-red:
    image: nodered/node-red:latest
    environment:
    - TZ=Europe/Amsterdam
    - DEBUG=kalender-events*
    ports:
    - &quot;1880:1880&quot;
    networks:
    - node-red-net
    volumes:
    - node-red-data:/data

volumes:
node-red-data:

networks:
node-red-net:
           
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>or:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-p</span> <span class="token number">1880</span>:1880 <span class="token parameter variable">--env</span> <span class="token assign-left variable">DEBUG</span><span class="token operator">=</span>kalender-events* <span class="token parameter variable">-v</span> node_red_data:/data <span class="token parameter variable">--name</span> mynodered nodered/node-red
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul>`,3);function u(b,k){const s=d("ExternalLinkIcon");return o(),i("div",null,[c,n("p",null,[e("My library "),n("a",p,[e("kalender-events"),a(s)]),e(" uses the "),n("a",v,[e("debug"),a(s)]),e(" package to put out some more informations, when collecting ical events from the calender.")]),m])}const g=r(l,[["render",u],["__file","debug.html.vue"]]);export{g as default};
