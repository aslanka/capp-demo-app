import * as yoha from '@handtracking.io/yoha';
import { ImageUtils } from 'three';
import { SetCursorColor, SetCursorPosition, SetCursorVisibility, InitializeCursor, addCAPP } from './cursor';
import Icon from './image.jpg';
import './style.css';

async function Run() {

    const modelFiles = await yoha.DownloadMultipleYohaTfjsModelBlobs(
        '/box/model.json',
        '/lan/model.json',
        (rec, total) => {}
    );

    InitializeCursor();


    const streamRes = await yoha.CreateMaxFpsMaxResStream();
    if (streamRes.error) {

        console.error(streamRes.error);
        return;
    }
    const video = yoha.CreateVideoElementFromStream(streamRes.stream);


    const wasmConfig = {
        wasmPaths: './node_modules/@tensorflow/tfjs-backend-wasm/dist/'
    };

    const thresholds = yoha.RecommendedHandPoseProbabilityThresholds;

    yoha.StartTfjsWasmEngine({ padding: 0.05 }, wasmConfig, video, modelFiles, res => {
        if (res.isHandPresentProb < thresholds.IS_HAND_PRESENT) {
            SetCursorVisibility(false);
            return;
        }
        SetCursorVisibility(true);


        if (res.poses.fistProb > thresholds.FIST) {
            SetCursorColor('red');
        } else if (res.poses.pinchProb > thresholds.PINCH) {
            SetCursorColor('orange');
            console.log("Pinched");
        } else {
            SetCursorColor('white');
        }

        SetCursorPosition(...res.coordinates[0]);

    });
}

Run();