import { cx, Section, FlexRow, Repeater } from 'cx/widgets';
import { bind, expr, tpl, Controller, KeySelection } from 'cx/ui';
import { Range, Chart, NumericAxis, Gridlines, LineGraph, MarkerLine, Legend } from 'cx/charts';
import { Svg, Text } from 'cx/svg';
import casual from '../../../util/casual';

class PageController extends Controller {
   init() {
      super.init();
      var y = 100;
      this.store.set('$page.points', Array.from({length: 101}, (_, i) => ({
         x: i * 4,
         y: y = y + (Math.random() - 0.5) * 30
      })));

      this.addComputable('$page.extremes', ['$page.points'], points => {
         if (points.length == 0)
            return null;
         var min = points[0].y;
         var max = points[0].y;
         for (var i = 1; i < points.length; i++) {
            if (points[i].y < min)
               min = points[i].y;
            if (points[i].y > max)
               max = points[i].y;
         }
         return {
            min,
            max
         }
      });

      this.store.set('$page.p1', { x: 150, y: 250 });
      this.store.set('$page.p2', { x: 250, y: 350 });
   }
}

export default <cx>
    <a href="https://github.com/codaxy/cx/tree/master/gallery/routes/charts/marker-line/standard.tsx" target="_blank" putInto="github">Source Code</a>
    <Section mod="well" 
        controller={PageController}
        style="height: 100%;"
        bodyStyle="display: flex;">
        <Svg style="width: 100%; flex: 1;">
           <Chart offset="20 -10 -40 40" axes={{ x: { type: NumericAxis }, y: { type: NumericAxis, vertical: true } }}>
              <Gridlines/>
              <MarkerLine y={bind("$page.extremes.min")} colorIndex={6}>
                 <Text anchors="0 0 0 0" offset="5 0 0 5" dy="0.8em">Min</Text>
              </MarkerLine>
              <MarkerLine y={bind("$page.extremes.max")} colorIndex={3}>
                 <Text anchors="0 0 0 0" offset="-5 0 0 5">Max</Text>
              </MarkerLine>
              <LineGraph data={bind("$page.points")} colorIndex={0} />
           </Chart>
        </Svg>
    </Section>
</cx >

import { hmr } from '../../hmr.js';
hmr(module);