class FitoGetImage:

 def getCodeImage(self):
 	code_image = 201701
  	# get code_image from codebar
 	return code_image

 def getImage(self, tipo):
 	if (tipo==0):  # lateral
 		url_image = "fitotron0.jpg"
 	else:          # frontal
 		url_image = "fitotron1.jpg"

 	# get image from opencv
 	return url_image
    
