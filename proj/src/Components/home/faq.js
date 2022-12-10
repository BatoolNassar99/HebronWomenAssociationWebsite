import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

function AppFaq() {
  return(
    <div id="faq" className="block faqBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>أسئلة مكررة</h2>
          <br></br><br></br>
        </div>


        <Collapse defaultActiveKey={['1']}>

          <Panel header="ما الذي يميز الحضانة النموذجية عن غيرها؟ " key="1">
            <p>ميزة وجود كاميرات المراقبة التي تمكن الأهالي من الاطمئنان على أطفالهم في الوقت الذي يناسبهم وبأسهل الطرق </p>
          </Panel>

          <Panel header="هل بإمكاني تسجيل ابني في أكثر من دورة؟ " key="2">
            <p>بالطبع </p>
          </Panel>
          
          <Panel header="كيف يمكنني معرفة مواعيد التسجيل للدورات المتاحة ؟ " key="3">
            <p> يتم عرض مواعيد التسجيل للدورات على موقع الجمعية بالاضافة إلى مواقع التواصل الاجتماعي الخاصة بالجمعية </p>
          </Panel>

        </Collapse>
      </div>
    </div>  
  );
}

export default AppFaq;