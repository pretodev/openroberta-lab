# Dockerfile for raspberry

# Remarks about the realtionship between Raspberry's and "traditional" server installation

There is no special documentation for Raspberry's installation of

* the database server. The folder in `conf` can be used as Java is platform independant
* apache2 and nginx. To run a webserver as frontend is easy, but not supported by us.
* debug container. It is likely, that this removed from `conf`, too.

Thus we describe how to generate a docker image from scratch, that can run the openroberta lab server. Everything else is
already covered by the `Docker/_README.md` file. Please read the section "step 1" and "step 2" at the beginning of that readme. 

Testing was done with a Raspberry 3, so it should work out of the box with Raspberry 4.

## Can be ignored

> Since the fix needed to compile c4ev3 programs on raspberry hasn't been published yet, the Dockerfile
> contains 3 lines that references 3 folders/files that need to be in this folder before creating the image.
> The files are:
> - recent version of ora-cc-rsc
> - recent version of RobotEV3.jar
> - C4EV3.Toolchain-2019.08.0-rpi.tar.gz

## Install docker on raspberry (done once and only once)

```bash
curl -sSL get.docker.com | sh
```

## Generate the image with the crosscompiler binaries

The image of this dockerfile hasn't been published, so you need to run the build.

To start the build, cd into the folder that contains the Dockerfile and:

```bash
docker build -t ora .
```

Then:

```bash
mkdir admin
docker run -d -p 1999:1999 -v admin:/opt/OpenRoberta/admin ora
```

## Testing

To verify the image and to ensure that the cross-compilers don't break each other, the Dockerfile will
run the tester script at the end of the build.
The tester script tries to compile an empty program for each robot plugin, using
the HTTP interface (like the browser would do).
