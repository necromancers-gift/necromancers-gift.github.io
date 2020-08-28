OLDPATH=$(pwd)

# from https://stackoverflow.com/a/24112741
SCRIPT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $SCRIPT_PATH
cd ..
presskit build presskit_template -D -o presskit

cd $OLDPATH
