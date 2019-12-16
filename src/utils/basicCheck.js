import { getAppConfigObj, setAppConfig } from '@/utils/InitSystemUtils';
import request from '@/utils/request';

import {message} from "antd";
import router from 'umi/router';
import configApi from '@/utils/configApi';
import { httpGet } from '@/utils/normalService';

const APP_CONFIG_SESSION_NAME = "appConfig";

function check(pathname = "") {
  const appConfig = getAppConfigObj();
  if(!appConfig || !appConfig.id) {
    //console.log("---------->need load-------");
    const init = configApi.url.init;
    if(init!==pathname) {
      httpGet("webInterceptorService.loadWebBase", {}).then((res) => {
        //console.log(res.obj);
        if (res.obj && res.obj.initFlag === "1") {
          setAppConfig(JSON.stringify(res.obj));
        } else {
          message.error("系统尚未初始化，请先初始化", 3, () => {
            router.push(configApi.url.init);
          })
        }
      });
    }
  } else {
    //console.log("=======checked========")
  }
}

export {
  check
}
