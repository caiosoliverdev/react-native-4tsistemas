using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace React.Native.Calendar_4t.RNReactNative4tSistemas
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNReactNative4tSistemasModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNReactNative4tSistemasModule"/>.
        /// </summary>
        internal RNReactNative4tSistemasModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNReactNative4tSistemas";
            }
        }
    }
}
